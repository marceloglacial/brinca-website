'use client'

import {
  Building2,
  Globe,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
} from 'lucide-react'
import { getLocalizedValue } from '@/lib/locales'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface PartnerCardProps {
  partner: any
  locale: string
}

export default function PartnerCard({ partner, locale }: PartnerCardProps) {
  const title = getLocalizedValue(partner.title, locale)
  const description = getLocalizedValue(partner.description, locale)
  const address = partner.contact?.address
    ? getLocalizedValue(partner.contact.address, locale)
    : null

  const facebookUrl = partner.social?.facebook
    ? partner.social.facebook.startsWith('http')
      ? partner.social.facebook
      : `https://facebook.com/${partner.social.facebook}`
    : null

  const instagramUrl = partner.social?.instagram
    ? partner.social.instagram.startsWith('http')
      ? partner.social.instagram
      : `https://instagram.com/${partner.social.instagram.replace('@', '')}`
    : null

  const linkedinUrl = partner.social?.linkedin
    ? partner.social.linkedin.startsWith('http')
      ? partner.social.linkedin
      : `https://linkedin.com/company/${partner.social.linkedin}`
    : null

  const whatsappUrl = partner.contact?.whatsapp
    ? `https://wa.me/${partner.contact.whatsapp.replace(/\D/g, '')}`
    : null

  const socialLinks = [
    whatsappUrl ? { href: whatsappUrl, label: 'WhatsApp', icon: MessageCircleMore } : null,
    facebookUrl ? { href: facebookUrl, label: 'Facebook', icon: Globe } : null,
    instagramUrl ? { href: instagramUrl, label: 'Instagram', icon: Globe } : null,
    linkedinUrl ? { href: linkedinUrl, label: 'LinkedIn', icon: Globe } : null,
  ].filter(Boolean) as Array<{
    href: string
    label: string
    icon: typeof Globe
  }>

  return (
    <Card className="h-full overflow-hidden rounded-[24px] border border-[#e7ebef] bg-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)]">
      <div className="flex h-full flex-col p-5 md:p-6">
        <div className="flex items-start gap-4">
          {partner.logo ? (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-[#edf1f4] bg-white p-3 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.45)] md:h-24 md:w-24">
              <img
                src={partner.logo}
                alt={title}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[20px] border border-[#edf1f4] bg-[#f8faf8] text-[#16a34a] md:h-24 md:w-24">
              <Building2 className="h-8 w-8" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <CardHeader className="space-y-2 p-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {locale === 'pt-BR' ? 'Associado' : 'Associate'}
              </p>
              <CardTitle className="text-[24px] leading-[1.15] font-bold text-slate-900 md:text-[28px]">
                {title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 p-0 pt-3">
              <p className="text-sm leading-6 text-slate-500 md:text-[15px]">
                {description}
              </p>

              <div className="grid gap-1.5 text-[13px] leading-5 text-slate-500">
                {address ? (
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#16a34a]" />
                    <span>{address}</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <Building2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#16a34a]" />
                    <span>{title}</span>
                  </div>
                )}

                {partner.contact?.email ? (
                  <Button
                    asChild
                    variant="link"
                    className="h-auto justify-start px-0 py-0 text-[13px] font-medium text-[#16a34a] hover:text-[#15803d]"
                  >
                    <a href={`mailto:${partner.contact.email}`}>
                      <Mail className="mr-1.5 h-3.5 w-3.5" />
                      {partner.contact.email}
                    </a>
                  </Button>
                ) : null}

                {partner.contact?.phone ? (
                  <Button
                    asChild
                    variant="link"
                    className="h-auto justify-start px-0 py-0 text-[13px] font-medium text-[#16a34a] hover:text-[#15803d]"
                  >
                    <a href={`tel:${partner.contact.phone}`}>
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      {partner.contact.phone}
                    </a>
                  </Button>
                ) : null}

                {!partner.contact?.phone && partner.contact?.whatsapp ? (
                  <Button
                    asChild
                    variant="link"
                    className="h-auto justify-start px-0 py-0 text-[13px] font-medium text-[#16a34a] hover:text-[#15803d]"
                  >
                    <a href={`tel:${partner.contact.whatsapp}`}>
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      {partner.contact.whatsapp}
                    </a>
                  </Button>
                ) : null}

                {partner.website ? (
                  <Button
                    asChild
                    variant="link"
                    className="h-auto justify-start px-0 py-0 text-[13px] font-medium text-[#16a34a] hover:text-[#15803d]"
                  >
                    <a href={partner.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-1.5 h-3.5 w-3.5" />
                      {partner.website.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </div>
        </div>

        {socialLinks.length > 0 ? (
          <CardFooter className="gap-2 p-0 pt-4">
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
          </CardFooter>
        ) : null}
      </div>
    </Card>
  )
}
