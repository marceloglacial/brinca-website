'use client'

import { useState } from 'react'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import { partnerSubmissionLabels } from '@/constants/partner-submission-labels'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      if (!formData.title_en.trim() && !formData.title_pt.trim()) {
        throw new Error(`${en.errorTitle} / ${pt.errorTitle}`)
      }
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
      <Alert variant="success" className="mt-8">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>
          {en.successTitle} / {pt.successTitle}
        </AlertTitle>
        <AlertDescription>
          <p>{en.successMessage}</p>
          <p className="mt-2">{pt.successMessage}</p>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="grid gap-8 max-w-full">
        <Card>
          <CardHeader>
            <CardTitle>{en.basicInfo} / {pt.basicInfo}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">

          {/* Partner Name - English & Portuguese */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="title_en">
                {en.partnerName} (English) <span className="text-red-500">{en.required}</span>
              </Label>
              <Input
                id="title_en"
                type="text"
                name="title_en"
                value={formData.title_en}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title_pt">
                {pt.partnerName} (Português) <span className="text-red-500">{pt.required}</span>
              </Label>
              <Input
                id="title_pt"
                type="text"
                name="title_pt"
                value={formData.title_pt}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Description - English & Portuguese */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="description_en">
                {en.description} (English) <span className="text-red-500">{en.required}</span>
              </Label>
              <Textarea
                id="description_en"
                name="description_en"
                value={formData.description_en}
                onChange={handleInputChange}
                rows={5}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description_pt">
                {pt.description} (Português) <span className="text-red-500">{pt.required}</span>
              </Label>
              <Textarea
                id="description_pt"
                name="description_pt"
                value={formData.description_pt}
                onChange={handleInputChange}
                rows={5}
              />
            </div>
          </div>

          {/* Category - Universal */}
          <div className="mb-4 grid gap-2">
            <Label htmlFor="category">
              {en.category} / {pt.category} <span className="text-red-500">{en.required}</span>
            </Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue
                  placeholder={`${en.selectCategory} / ${pt.selectCategory}`}
                />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Logo URL - Universal */}
          <div className="mb-4 grid gap-2">
            <Label htmlFor="logo">
              {en.logoUrl} / {pt.logoUrl}
            </Label>
            <Input
              id="logo"
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              placeholder="https://..."
            />
          </div>

          {/* Website - Universal */}
          <div className="grid gap-2">
            <Label htmlFor="website">
              {en.website} / {pt.website}
            </Label>
            <Input
              id="website"
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://..."
            />
          </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{en.contact} / {pt.contact}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">

          <div className="mb-4 grid gap-2">
            <Label htmlFor="contact_email">
              {en.email} <span className="text-red-500">{en.required}</span>
            </Label>
            <Input
              id="contact_email"
              type="email"
              name="contact.email"
              value={formData.contact.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="contact_phone">
                {en.phone}
              </Label>
              <Input
                id="contact_phone"
                type="tel"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact_whatsapp">
                {en.whatsapp} / {pt.whatsapp}
              </Label>
              <Input
                id="contact_whatsapp"
                type="tel"
                name="contact.whatsapp"
                value={formData.contact.whatsapp}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4 grid gap-2">
            <Label htmlFor="contact_address">
              {en.address} / {pt.address}
            </Label>
            <Input
              id="contact_address"
              type="text"
              name="contact.address"
              value={formData.contact.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="membershipEmail">
              {en.membershipEmail} / {pt.membershipEmail}
            </Label>
            <Input
              id="membershipEmail"
              type="email"
              name="membershipEmail"
              value={formData.membershipEmail}
              onChange={handleInputChange}
              placeholder={en.membershipEmailHint}
            />
          </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{en.social} / {pt.social}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">

          <div className="mb-4 grid gap-2">
            <Label htmlFor="social_facebook">
              {en.facebook}
            </Label>
            <Input
              id="social_facebook"
              type="url"
              name="social.facebook"
              value={formData.social.facebook}
              onChange={handleInputChange}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="mb-4 grid gap-2">
            <Label htmlFor="social_instagram">
              {en.instagram}
            </Label>
            <Input
              id="social_instagram"
              type="url"
              name="social.instagram"
              value={formData.social.instagram}
              onChange={handleInputChange}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="social_linkedin">
              {en.linkedin}
            </Label>
            <Input
              id="social_linkedin"
              type="url"
              name="social.linkedin"
              value={formData.social.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/company/..."
            />
          </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <CircleAlert className="h-4 w-4" />
            <AlertTitle>{en.errorSubmit}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-fit">
          {isSubmitting ? `${en.submitting} / ${pt.submitting}` : `${en.submit} / ${pt.submit}`}
        </Button>
      </form>
    </div>
  )
}
