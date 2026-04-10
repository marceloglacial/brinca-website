'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { mentorRequestLabels } from '@/constants/mentor-request-labels'
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
      <div className="mt-8 rounded-md border border-green-200 bg-green-50 p-4">
        <h3 className="mb-2 font-semibold text-green-900">{labels.successTitle}</h3>
        <p className="text-green-800">{labels.successMessage}</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="grid gap-6 max-w-lg">
        <div className="grid gap-2">
          <Label htmlFor="name">
            {labels.name} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">
            {labels.email} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">
            {labels.phone} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            inputMode="numeric"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="plannedTravelDate">
            {labels.plannedTravelDate} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="plannedTravelDate"
            type="date"
            name="plannedTravelDate"
            value={formData.plannedTravelDate}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="stayDuration">
            {labels.stayDuration} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Input
            id="stayDuration"
            type="text"
            name="stayDuration"
            value={formData.stayDuration}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="familyDescription">
            {labels.familyDescription} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Textarea
            id="familyDescription"
            name="familyDescription"
            value={formData.familyDescription}
            onChange={handleChange}
            rows={6}
          />
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-red-900">
            {error}
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-fit">
          {isSubmitting ? labels.submitting : labels.submit}
        </Button>
      </form>
    </div>
  )
}
