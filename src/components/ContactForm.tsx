'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { contactFormLabels } from '@/constants/contact-form-labels'

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
      <div
        style={{
          marginTop: '2rem',
          padding: '2rem',
          backgroundColor: '#f0fdf4',
          borderRadius: '0.5rem',
        }}
      >
        <h3 style={{ color: '#16a34a', marginBottom: '0.5rem' }}>{labels.successTitle}</h3>
        <p style={{ color: '#15803d' }}>{labels.successMessage}</p>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '0.25rem',
    width: '100%',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'grid',
    gap: '0.5rem',
    marginBottom: '1rem',
  }

  const required = <span style={{ color: '#ef4444' }}>{labels.required}</span>

  return (
    <div style={{ marginTop: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.25rem', maxWidth: '640px' }}>
        <label style={labelStyle}>
          <span style={{ fontWeight: 500 }}>
            {labels.name} {required}
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={labels.namePlaceholder}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          <span style={{ fontWeight: 500 }}>
            {labels.email} {required}
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={labels.emailPlaceholder}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          <span style={{ fontWeight: 500 }}>
            {labels.message} {required}
          </span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            style={inputStyle}
          />
        </label>

        {error ? (
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              borderRadius: '0.25rem',
              border: '1px solid #fecaca',
              marginBottom: '1rem',
            }}
          >
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.6 : 1,
            justifySelf: 'start',
          }}
        >
          {isSubmitting ? labels.submitting : labels.submit}
        </button>
      </form>
    </div>
  )
}
