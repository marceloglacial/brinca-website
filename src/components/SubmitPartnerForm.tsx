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
  const fieldClass =
    'min-h-14 rounded-2xl border-2 border-[#16a34a] bg-white px-6 text-base font-medium text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]'
  const textareaClass =
    'min-h-[180px] rounded-2xl border-2 border-[#16a34a] bg-white px-6 py-4 text-base font-medium text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]'
  const labelClass = 'text-[15px] font-bold leading-6 text-slate-900'
  const sectionClass = 'border-0 bg-transparent shadow-none'
  const sectionHeaderClass = 'px-0 pb-5 pt-0'
  const sectionTitleClass = 'text-xl font-bold tracking-normal text-slate-900'
  const sectionContentClass = 'grid gap-5 px-0 pt-0 md:gap-6'
  const submitClass =
    'min-h-12 rounded-full border-2 border-[#16a34a] bg-white px-8 text-base font-normal text-[#16a34a] transition-colors hover:bg-[#16a34a] hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]'

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
    <div className="mt-8 md:mt-10">
      <form onSubmit={handleSubmit} className="mx-auto grid w-full max-w-screen-md gap-10 md:gap-12">
        <Card className={sectionClass}>
          <CardHeader className={sectionHeaderClass}>
            <CardTitle className={sectionTitleClass}>{en.basicInfo} / {pt.basicInfo}</CardTitle>
          </CardHeader>
          <CardContent className={sectionContentClass}>

          {/* Partner Name - English & Portuguese */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <div className="grid gap-3">
              <Label htmlFor="title_en" className={labelClass}>
                {en.partnerName} (English) <span className="text-red-500">{en.required}</span>
              </Label>
              <Input
                id="title_en"
                type="text"
                name="title_en"
                value={formData.title_en}
                onChange={handleInputChange}
                className={fieldClass}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="title_pt" className={labelClass}>
                {pt.partnerName} (Português) <span className="text-red-500">{pt.required}</span>
              </Label>
              <Input
                id="title_pt"
                type="text"
                name="title_pt"
                value={formData.title_pt}
                onChange={handleInputChange}
                className={fieldClass}
              />
            </div>
          </div>

          {/* Description - English & Portuguese */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <div className="grid gap-3">
              <Label htmlFor="description_en" className={labelClass}>
                {en.description} (English) <span className="text-red-500">{en.required}</span>
              </Label>
              <Textarea
                id="description_en"
                name="description_en"
                value={formData.description_en}
                onChange={handleInputChange}
                rows={5}
                className={textareaClass}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description_pt" className={labelClass}>
                {pt.description} (Português) <span className="text-red-500">{pt.required}</span>
              </Label>
              <Textarea
                id="description_pt"
                name="description_pt"
                value={formData.description_pt}
                onChange={handleInputChange}
                rows={5}
                className={textareaClass}
              />
            </div>
          </div>

          {/* Category - Universal */}
          <div className="grid gap-3">
            <Label htmlFor="category" className={labelClass}>
              {en.category} / {pt.category} <span className="text-red-500">{en.required}</span>
            </Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category" className={fieldClass}>
                <SelectValue
                  placeholder={`${en.selectCategory} / ${pt.selectCategory}`}
                />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-2 border-[#16a34a] bg-white p-2 text-base font-medium text-slate-900 shadow-lg">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id}
                    className="rounded-xl py-3 pl-8 pr-3 text-base font-medium focus:bg-[#16a34a]/10 focus:text-slate-900"
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Logo URL - Universal */}
          <div className="grid gap-3">
            <Label htmlFor="logo" className={labelClass}>
              {en.logoUrl} / {pt.logoUrl}
            </Label>
            <Input
              id="logo"
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              placeholder="https://..."
              className={fieldClass}
            />
          </div>

          {/* Website - Universal */}
          <div className="grid gap-3">
            <Label htmlFor="website" className={labelClass}>
              {en.website} / {pt.website}
            </Label>
            <Input
              id="website"
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://..."
              className={fieldClass}
            />
          </div>
          </CardContent>
        </Card>

        <Card className={sectionClass}>
          <CardHeader className={sectionHeaderClass}>
            <CardTitle className={sectionTitleClass}>{en.contact} / {pt.contact}</CardTitle>
          </CardHeader>
          <CardContent className={sectionContentClass}>

          <div className="grid gap-3">
            <Label htmlFor="contact_email" className={labelClass}>
              {en.email} <span className="text-red-500">{en.required}</span>
            </Label>
            <Input
              id="contact_email"
              type="email"
              name="contact.email"
              value={formData.contact.email}
              onChange={handleInputChange}
              required
              className={fieldClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <div className="grid gap-3">
              <Label htmlFor="contact_phone" className={labelClass}>
                {en.phone}
              </Label>
              <Input
                id="contact_phone"
                type="tel"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleInputChange}
                className={fieldClass}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="contact_whatsapp" className={labelClass}>
                {en.whatsapp} / {pt.whatsapp}
              </Label>
              <Input
                id="contact_whatsapp"
                type="tel"
                name="contact.whatsapp"
                value={formData.contact.whatsapp}
                onChange={handleInputChange}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="contact_address" className={labelClass}>
              {en.address} / {pt.address}
            </Label>
            <Input
              id="contact_address"
              type="text"
              name="contact.address"
              value={formData.contact.address}
              onChange={handleInputChange}
              className={fieldClass}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="membershipEmail" className={labelClass}>
              {en.membershipEmail} / {pt.membershipEmail}
            </Label>
            <Input
              id="membershipEmail"
              type="email"
              name="membershipEmail"
              value={formData.membershipEmail}
              onChange={handleInputChange}
              placeholder={en.membershipEmailHint}
              className={fieldClass}
            />
          </div>
          </CardContent>
        </Card>

        <Card className={sectionClass}>
          <CardHeader className={sectionHeaderClass}>
            <CardTitle className={sectionTitleClass}>{en.social} / {pt.social}</CardTitle>
          </CardHeader>
          <CardContent className={sectionContentClass}>

          <div className="grid gap-3">
            <Label htmlFor="social_facebook" className={labelClass}>
              {en.facebook}
            </Label>
            <Input
              id="social_facebook"
              type="url"
              name="social.facebook"
              value={formData.social.facebook}
              onChange={handleInputChange}
              placeholder="https://facebook.com/..."
              className={fieldClass}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="social_instagram" className={labelClass}>
              {en.instagram}
            </Label>
            <Input
              id="social_instagram"
              type="url"
              name="social.instagram"
              value={formData.social.instagram}
              onChange={handleInputChange}
              placeholder="https://instagram.com/..."
              className={fieldClass}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="social_linkedin" className={labelClass}>
              {en.linkedin}
            </Label>
            <Input
              id="social_linkedin"
              type="url"
              name="social.linkedin"
              value={formData.social.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/company/..."
              className={fieldClass}
            />
          </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="rounded-2xl border-2 border-red-300 px-5 py-4 text-[15px]">
            <CircleAlert className="h-4 w-4" />
            <AlertTitle>{en.errorSubmit}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isSubmitting} className={submitClass}>
          {isSubmitting ? `${en.submitting} / ${pt.submitting}` : `${en.submit} / ${pt.submit}`}
        </Button>
      </form>
    </div>
  )
}
