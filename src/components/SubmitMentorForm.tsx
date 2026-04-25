'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import { mentorSubmissionLabels } from '@/constants/mentor-submission-labels'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type FormData = {
  name: string
  email: string
  phone: string
  inCanadaSince: string
  hasChildren: string
  profile: string
}

const emptyForm: FormData = {
  name: '',
  email: '',
  phone: '',
  inCanadaSince: '',
  hasChildren: '',
  profile: '',
}

export default function SubmitMentorForm() {
  const pathname = usePathname()
  const urlLocale = pathname?.split('/').filter(Boolean)[0] ?? 'en'
  const labels =
    mentorSubmissionLabels[urlLocale as keyof typeof mentorSubmissionLabels] ??
    mentorSubmissionLabels.en

  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const fieldClass =
    'min-h-14 rounded-2xl border-2 border-[#16a34a] bg-white px-6 text-[15px] text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]'
  const textareaClass =
    'min-h-[180px] rounded-2xl border-2 border-[#16a34a] bg-white px-6 py-4 text-[15px] text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]'
  const labelClass = 'text-[15px] font-bold leading-6 text-slate-900'
  const submitClass =
    'min-h-12 rounded-full border-2 border-[#16a34a] bg-white px-8 text-base font-normal text-[#16a34a] transition-colors hover:bg-[#16a34a] hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      if (!formData.name.trim()) throw new Error(labels.errorName)
      if (!formData.email.trim()) throw new Error(labels.errorEmail)
      if (!formData.phone.trim()) throw new Error(labels.errorPhone)
      if (!formData.inCanadaSince) throw new Error(labels.errorInCanadaSince)
      if (!formData.hasChildren.trim()) throw new Error(labels.errorHasChildren)
      if (!formData.profile.trim()) throw new Error(labels.errorProfile)

      const response = await fetch('/api/mentors/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
      <Alert variant="success" className="mt-8">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>{labels.successTitle}</AlertTitle>
        <AlertDescription>{labels.successMessage}</AlertDescription>
      </Alert>
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
        </div>

        <div className="grid gap-3">
          <Label htmlFor="phone" className={labelClass}>
            {labels.phone} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            inputMode="numeric"
            className={fieldClass}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="inCanadaSince" className={labelClass}>
            {labels.inCanadaSince} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="inCanadaSince"
            type="date"
            name="inCanadaSince"
            value={formData.inCanadaSince}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="hasChildren" className={labelClass}>
            {labels.hasChildren} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="hasChildren"
            type="text"
            name="hasChildren"
            value={formData.hasChildren}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="profile" className={labelClass}>
            {labels.profile} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Textarea
            id="profile"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            rows={6}
            className={textareaClass}
          />
        </div>

        {error ? (
          <Alert variant="destructive" className="rounded-2xl border-2 border-red-300 px-5 py-4 text-[15px]">
            <CircleAlert className="h-4 w-4" />
            <AlertTitle>{labels.errorSubmit}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className={submitClass}
        >
          {isSubmitting ? labels.submitting : labels.submit}
        </Button>
      </form>
    </div>
  )
}
