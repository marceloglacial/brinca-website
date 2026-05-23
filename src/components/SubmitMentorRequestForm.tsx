'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import { mentorRequestLabels } from '@/constants/mentor-request-labels'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type FormData = {
  name: string
  email: string
  phone: string
  plannedTravelDate: string
  stayDuration: string
  familyDescription: string
}

const emptyForm: FormData = {
  name: '',
  email: '',
  phone: '',
  plannedTravelDate: '',
  stayDuration: '',
  familyDescription: '',
}

export default function SubmitMentorRequestForm() {
  const pathname = usePathname()
  const urlLocale = pathname?.split('/').filter(Boolean)[0] ?? 'en'
  const labels =
    mentorRequestLabels[urlLocale as keyof typeof mentorRequestLabels] ?? mentorRequestLabels.en

  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const fieldClass =
    'min-h-14 rounded-2xl border-2 border-[#16a34a] bg-white px-6 text-base font-medium text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]'
  const textareaClass =
    'min-h-[180px] rounded-2xl border-2 border-[#16a34a] bg-white px-6 py-4 text-base font-medium text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]'
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
      if (!formData.plannedTravelDate) throw new Error(labels.errorPlannedTravelDate)
      if (!formData.stayDuration.trim()) throw new Error(labels.errorStayDuration)
      if (!formData.familyDescription.trim()) throw new Error(labels.errorFamilyDescription)

      const response = await fetch('/api/mentor-requests/submit', {
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
          <Label htmlFor="plannedTravelDate" className={labelClass}>
            {labels.plannedTravelDate} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="plannedTravelDate"
            type="date"
            name="plannedTravelDate"
            value={formData.plannedTravelDate}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="stayDuration" className={labelClass}>
            {labels.stayDuration} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="stayDuration"
            type="text"
            name="stayDuration"
            value={formData.stayDuration}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="familyDescription" className={labelClass}>
            {labels.familyDescription} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Textarea
            id="familyDescription"
            name="familyDescription"
            value={formData.familyDescription}
            onChange={handleChange}
            rows={6}
            className={textareaClass}
          />
        </div>

        {error && (
          <Alert variant="destructive" className="rounded-2xl border-2 border-red-300 px-5 py-4 text-[15px]">
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
