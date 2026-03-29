'use client'

import { useState } from 'react'
import { partnerSubmissionLabels } from '@/constants/partner-submission-labels'

type FormData = {
  title_en: string
  title_pt: string
  description_en: string
  description_pt: string
  logo: string
  category: string
  contact: {
    email: string
    phone: string
    whatsapp: string
    address: string
  }
  website: string
  social: {
    facebook: string
    instagram: string
    linkedin: string
  }
  membershipEmail: string
}

type PartnerCategory = {
  id: string
  name: string
}

type Props = {
  categories: PartnerCategory[]
}

export default function SubmitPartnerForm({ categories }: Props) {
  const en = partnerSubmissionLabels.en
  const pt = partnerSubmissionLabels['pt-BR']

  const [formData, setFormData] = useState<FormData>({
    title_en: '',
    title_pt: '',
    description_en: '',
    description_pt: '',
    logo: '',
    category: '',
    contact: {
      email: '',
      phone: '',
      whatsapp: '',
      address: '',
    },
    website: '',
    social: {
      facebook: '',
      instagram: '',
      linkedin: '',
    },
    membershipEmail: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    if (name.startsWith('contact.')) {
      const field = name.replace('contact.', '')
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value,
        },
      }))
    } else if (name.startsWith('social.')) {
      const field = name.replace('social.', '')
      setFormData((prev) => ({
        ...prev,
        social: {
          ...prev.social,
          [field]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // Validate: at least one language for title
      if (!formData.title_en.trim() && !formData.title_pt.trim()) {
        throw new Error(`${en.errorTitle} / ${pt.errorTitle}`)
      }
      // Validate: at least one language for description
      if (!formData.description_en.trim() && !formData.description_pt.trim()) {
        throw new Error(`${en.errorDescription} / ${pt.errorDescription}`)
      }
      if (!formData.category) {
        throw new Error(`${en.errorCategory} / ${pt.errorCategory}`)
      }
      if (!formData.contact.email.trim()) {
        throw new Error(`${en.errorEmail} / ${pt.errorEmail}`)
      }

      const response = await fetch('/api/partners/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || en.errorSubmit)
      }

      setSubmitted(true)
      // Reset form after successful submission
      setFormData({
        title_en: '',
        title_pt: '',
        description_en: '',
        description_pt: '',
        logo: '',
        category: '',
        contact: {
          email: '',
          phone: '',
          whatsapp: '',
          address: '',
        },
        website: '',
        social: {
          facebook: '',
          instagram: '',
          linkedin: '',
        },
        membershipEmail: '',
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : en.errorSubmit
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="submit-partner-success" style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#f0fdf4', borderRadius: '0.5rem' }}>
        <h3 style={{ color: '#16a34a', marginBottom: '0.5rem' }}>
          {en.successTitle} / {pt.successTitle}
        </h3>
        <p style={{ color: '#15803d' }}>
          {en.successMessage}
        </p>
        <p style={{ color: '#15803d', marginTop: '0.5rem' }}>
          {pt.successMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="submit-partner-form" style={{ marginTop: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', maxWidth: '100%' }}>
        {/* Basic Information - Bilingual Fields */}
        <fieldset style={{ border: 'none', padding: 0 }}>
          <legend style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
            {en.basicInfo} / {pt.basicInfo}
          </legend>

          {/* Partner Name - English & Portuguese */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <label style={{ display: 'grid', gap: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>
                {en.partnerName} (English) <span style={{ color: '#ef4444' }}>{en.required}</span>
              </span>
              <input
                type="text"
                name="title_en"
                value={formData.title_en}
                onChange={handleInputChange}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>
                {pt.partnerName} (Português) <span style={{ color: '#ef4444' }}>{pt.required}</span>
              </span>
              <input
                type="text"
                name="title_pt"
                value={formData.title_pt}
                onChange={handleInputChange}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              />
            </label>
          </div>

          {/* Description - English & Portuguese */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <label style={{ display: 'grid', gap: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>
                {en.description} (English) <span style={{ color: '#ef4444' }}>{en.required}</span>
              </span>
              <textarea
                name="description_en"
                value={formData.description_en}
                onChange={handleInputChange}
                rows={5}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>
                {pt.description} (Português) <span style={{ color: '#ef4444' }}>{pt.required}</span>
              </span>
              <textarea
                name="description_pt"
                value={formData.description_pt}
                onChange={handleInputChange}
                rows={5}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              />
            </label>
          </div>

          {/* Category - Universal */}
          <label style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>
              {en.category} / {pt.category} <span style={{ color: '#ef4444' }}>{en.required}</span>
            </span>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
            >
              <option value="">{en.selectCategory} / {pt.selectCategory}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>

          {/* Logo URL - Universal */}
          <label style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{en.logoUrl} / {pt.logoUrl}</span>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              placeholder="https://..."
              style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
            />
          </label>

          {/* Website - Universal */}
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 500 }}>{en.website} / {pt.website}</span>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://..."
              style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
            />
          </label>
        </fieldset>

        {/* Contact Information - Universal */}
        <fieldset style={{ border: 'none', padding: 0 }}>
          <legend style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
            {en.contact} / {pt.contact}
          </legend>

          <label style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>
              {en.email} <span style={{ color: '#ef4444' }}>{en.required}</span>
            </span>
            <input
              type="email"
              name="contact.email"
              value={formData.contact.email}
              onChange={handleInputChange}
              required
              style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <label style={{ display: 'grid', gap: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>{en.phone}</span>
              <input
                type="tel"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleInputChange}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              />
            </label>
            <label style={{ display: 'grid', gap: '0.5rem' }}>
              <span style={{ fontWeight: 500 }}>{en.whatsapp} / {pt.whatsapp}</span>
              <input
                type="tel"
                name="contact.whatsapp"
                value={formData.contact.whatsapp}
                onChange={handleInputChange}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
              />
            </label>
          </div>

          <label style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{en.address} / {pt.address}</span>
            <input
              type="text"
              name="contact.address"
              value={formData.contact.address}
              onChange={handleInputChange}
              style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
            />
          </label>

          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 500 }}>{en.membershipEmail} / {pt.membershipEmail}</span>
            <input
              type="email"
              name="membershipEmail"
              value={formData.membershipEmail}
              onChange={handleInputChange}
              placeholder={en.membershipEmailHint}
              style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
            />
          </label>
        </fieldset>

        {/* Social Media - Universal */}
        <fieldset style={{ border: 'none', padding: 0 }}>
          <legend style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>{en.social} / {pt.social}</legend>

          <label style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{en.facebook}</span>
            <input
              type="url"
              name="social.facebook"
              value={formData.social.facebook}
              onChange={handleInputChange}
              placeholder="https://facebook.com/..."
              style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
            />
          </label>

          <label style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{en.instagram}</span>
            <input
              type="url"
              name="social.instagram"
              value={formData.social.instagram}
              onChange={handleInputChange}
              placeholder="https://instagram.com/..."
              style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
            />
          </label>

          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 500 }}>{en.linkedin}</span>
            <input
              type="url"
              name="social.linkedin"
              value={formData.social.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/company/..."
              style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
            />
          </label>
        </fieldset>

        {/* Error and Submit */}
        {error ? (
          <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '0.25rem', border: '1px solid #fecaca' }}>
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
          }}
        >
          {isSubmitting ? `${en.submitting} / ${pt.submitting}` : `${en.submit} / ${pt.submit}`}
        </button>
      </form>
    </div>
  )
}
