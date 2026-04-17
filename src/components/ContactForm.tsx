'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import { contactFormLabels } from '@/constants/contact-form-labels'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type FormData = {
  name: string
  email: string
  message: string
}

const emptyForm: FormData = { name: '', email: '', message: '' }

export default function ContactForm() {
  const pathname = usePathname()
  const urlLocale = pathname?.split('/').filter(Boolean)[0] ?? 'en'
  const labels =
    contactFormLabels[urlLocale as keyof typeof contactFormLabels] ?? contactFormLabels.en

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
      if (!formData.message.trim()) throw new Error(labels.errorMessage)

      const response = await fetch('/api/contact', {
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
            placeholder={labels.namePlaceholder}
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
            placeholder={labels.emailPlaceholder}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">
            {labels.message} <span className="text-red-500">{labels.required}</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <CircleAlert className="h-4 w-4" />
            <AlertTitle>{labels.errorSubmit}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-fit">
          {isSubmitting ? labels.submitting : labels.submit}
        </Button>
      </form>
    </div>
  )
}
