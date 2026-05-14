'use client'

import type { ReactElement, SVGProps } from 'react'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import { getLocalizedValue } from '@/lib/locales'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PartnerCardProps {
  partner: any
  locale: string
}

function getTrimmedValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3V11H9v3h2.3v7h2.2Z" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.8 8.9H3.9V20h2.9V8.9Zm-1.4-1.6a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM20.1 20v-6.1c0-3.3-1.8-4.8-4.2-4.8-1.9 0-2.8 1.1-3.2 1.8V8.9H9.8c0 1.3 0 11.1 0 11.1h2.9v-6.2c0-.3 0-.7.1-.9.3-.7.9-1.5 2-1.5 1.4 0 2 1.1 2 2.8V20h3.3Z" />
    </svg>
  )
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.5 12a8.5 8.5 0 0 1-12.2 7.6L4 20.9l1.3-4.2A8.5 8.5 0 1 1 20.5 12Zm-8.5-7a7 7 0 0 0-6.1 10.5l.2.3-.8 2.5 2.6-.8.3.2A7 7 0 1 0 12 5Zm4.2 8.9c-.2-.1-1.3-.7-1.5-.7-.2-.1-.3-.1-.5.1l-.4.5c-.1.1-.2.2-.4.1a5.8 5.8 0 0 1-1.7-1 6.6 6.6 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.3-.4.2-.3c.1-.1.1-.3 0-.4 0-.1-.5-1.2-.7-1.6-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.4 0-.6.2s-.8.8-.8 1.9.8 2.2.9 2.3c.1.2 1.5 2.4 3.7 3.3.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2Z" />
    </svg>
  )
}

export default function PartnerCard({ partner, locale }: PartnerCardProps) {
  const title = getLocalizedValue(partner.title, locale)
  const description = getTrimmedValue(getLocalizedValue(partner.description, locale))
  const address = getTrimmedValue(
    partner.contact?.address ? getLocalizedValue(partner.contact.address, locale) : '',
  )
  const email = getTrimmedValue(partner.contact?.email)
  const phone = getTrimmedValue(partner.contact?.phone)
  const whatsapp = getTrimmedValue(partner.contact?.whatsapp)
  const website = getTrimmedValue(partner.website)
  const facebook = getTrimmedValue(partner.social?.facebook)
  const instagram = getTrimmedValue(partner.social?.instagram)
  const linkedin = getTrimmedValue(partner.social?.linkedin)

  const facebookUrl = facebook
    ? facebook.startsWith('http')
      ? facebook
      : `https://facebook.com/${facebook}`
    : null

  const instagramUrl = instagram
    ? instagram.startsWith('http')
      ? instagram
      : `https://instagram.com/${instagram.replace('@', '')}`
    : null

  const linkedinUrl = linkedin
    ? linkedin.startsWith('http')
      ? linkedin
      : `https://linkedin.com/company/${linkedin}`
    : null

  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, '')}`
    : null
  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null

  const socialLinks = [
    whatsappUrl ? { href: whatsappUrl, label: 'WhatsApp', icon: WhatsAppIcon } : null,
    facebookUrl ? { href: facebookUrl, label: 'Facebook', icon: FacebookIcon } : null,
    instagramUrl ? { href: instagramUrl, label: 'Instagram', icon: InstagramIcon } : null,
    linkedinUrl ? { href: linkedinUrl, label: 'LinkedIn', icon: LinkedInIcon } : null,
  ].filter(Boolean) as Array<{
    href: string
    label: string
    icon: (props: SVGProps<SVGSVGElement>) => ReactElement
  }>

  return (
    <Card className="h-full overflow-hidden rounded-3xl border border-[#e7ebef] bg-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)]">
      <div className="flex h-full flex-col p-5 md:p-6">
        <div className="flex items-start gap-4">
          {partner.logo && (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[20px]bg-white p-3 md:h-24 md:w-24">
              <img src={partner.logo} alt={title} className="h-full w-full object-contain" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <CardHeader className="space-y-2 p-0">
              <CardTitle className="text-[24px] leading-[1.15] font-bold text-slate-900 md:text-[28px]">
                {title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 p-0 pt-3">
              {description ? <div className="text-sm leading-6 md:text-[15px]">{description}</div> : null}

              <div className="grid gap-1.5 text-[13px] leading-5 text-slate-500">
                {address ? (
                  <Button
                    asChild
                    variant="link"
                    className="h-auto justify-start px-0 py-0 text-left text-[13px] font-medium text-[#16a34a] hover:text-[#15803d]"
                  >
                    <a href={mapsUrl ?? undefined} target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-1.5 h-3.5 w-3.5 shrink-0" />
                      {address}
                    </a>
                  </Button>
                ) : null}

                {email ? (
                  <Button
                    asChild
                    variant="link"
                    className="h-auto justify-start px-0 py-0 text-[13px] font-medium text-[#16a34a] hover:text-[#15803d]"
                  >
                    <a href={`mailto:${email}`}>
                      <Mail className="mr-1.5 h-3.5 w-3.5" />
                      {email}
                    </a>
                  </Button>
                ) : null}

                {phone ? (
                  <Button
                    asChild
                    variant="link"
                    className="h-auto justify-start px-0 py-0 text-[13px] font-medium text-[#16a34a] hover:text-[#15803d]"
                  >
                    <a href={`tel:${phone}`}>
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      {phone}
                    </a>
                  </Button>
                ) : null}

                {!phone && whatsapp ? (
                  <Button
                    asChild
                    variant="link"
                    className="h-auto justify-start px-0 py-0 text-[13px] font-medium text-[#16a34a] hover:text-[#15803d]"
                  >
                    <a href={`tel:${whatsapp}`}>
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      {whatsapp}
                    </a>
                  </Button>
                ) : null}

                {website ? (
                  <Button
                    asChild
                    variant="link"
                    className="h-auto justify-start px-0 py-0 text-[13px] font-medium text-[#16a34a] hover:text-[#15803d]"
                  >
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-1.5 h-3.5 w-3.5" />
                      {website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </Button>
                ) : null}

                {socialLinks.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {socialLinks.map(({ href, label, icon: Icon }) => (
                      <Button
                        key={label}
                        asChild
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full border-[#dbe7dd] bg-white text-[#16a34a] shadow-none hover:bg-[#16a34a] hover:text-white"
                      >
                        <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
                          <Icon className="h-3.5 w-3.5" />
                          <span className="sr-only">{label}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                ) : null}
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </Card>
  )
}
