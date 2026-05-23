'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import { ebookRequestLabels } from '@/constants/ebook-request-labels'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  consentText?: string | null
  disclaimerText?: string | null
  downloadUrl: string
}

type FormData = {
  consentGiven: boolean
  name: string
  email: string
}

const emptyForm: FormData = { name: '', email: '', consentGiven: false }

export default function SubmitEbookRequestForm({
  disclaimerText,
  consentText,
  downloadUrl,
}: Props) {
  const pathname = usePathname()
  const urlLocale = pathname?.split('/').filter(Boolean)[0] ?? 'en'
  const labels =
    ebookRequestLabels[urlLocale as keyof typeof ebookRequestLabels] ?? ebookRequestLabels.en

  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const fieldClass =
    'min-h-14 rounded-2xl border-2 border-[#16a34a] bg-white px-6 text-base font-medium text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]'
  const labelClass = 'text-[15px] font-bold leading-6 text-slate-900'
  const submitClass =
    'min-h-12 rounded-full border-2 border-[#16a34a] bg-white px-8 text-base font-normal text-[#16a34a] transition-colors hover:bg-[#16a34a] hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]'
  const helperTextClass = 'text-sm leading-6 text-slate-600'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleConsentChange = (checked: boolean | 'indeterminate') => {
    setFormData((prev) => ({ ...prev, consentGiven: checked === true }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      if (!formData.name.trim()) throw new Error(labels.errorName)
      if (!formData.email.trim()) throw new Error(labels.errorEmail)

      const response = await fetch('/api/ebook-requests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || labels.errorSubmit)
      }

      setSubmitted(true)
      setFormData(emptyForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.errorSubmit)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex justify-center flex-col gap-5 text-center">
        <p>{labels.successMessage}</p>
        <Button asChild variant="brincaSolid" size="brinca" className=" max-w-64 mx-auto">
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            {labels.download}
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-8 md:mt-10">
      <form onSubmit={handleSubmit} className="mx-auto grid w-full max-w-screen-md gap-5 md:gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name" className={labelClass}>
            {labels.name} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email" className={labelClass}>
            {labels.email} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={fieldClass}
          />
          {disclaimerText ? <p className={helperTextClass}>{disclaimerText}</p> : null}
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Checkbox
            id="consentGiven"
            checked={formData.consentGiven}
            onCheckedChange={handleConsentChange}
            className="mt-1 border-[#16a34a] data-[state=checked]:bg-[#16a34a] data-[state=checked]:text-white"
          />
          <Label htmlFor="consentGiven" className="text-sm font-normal leading-6 text-slate-700">
            {consentText || ''}
          </Label>
        </div>

        {error && (
          <Alert
            variant="destructive"
            className="rounded-2xl border-2 border-red-300 px-5 py-4 text-[15px]"
          >
            <CircleAlert className="h-4 w-4" />
            <AlertTitle>{labels.errorSubmit}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isSubmitting} className={submitClass}>
          {isSubmitting ? labels.submitting : labels.submit}
        </Button>
      </form>
    </div>
  )
}
