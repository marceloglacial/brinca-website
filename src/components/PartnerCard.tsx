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
import { Badge } from '@/components/ui/badge'
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
    <Card className="overflow-hidden rounded-2xl">
      <div className="flex flex-col md:flex-row">
        {partner.logo ? (
          <div className="border-b bg-muted/30 p-6 md:w-52 md:border-b-0 md:border-r">
            <img
              src={partner.logo}
              alt={title}
              className="mx-auto h-auto w-full max-w-[160px] object-contain"
            />
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <CardHeader className="gap-3">
            <Badge variant="secondary" className="w-fit">
              Partner
            </Badge>
            <CardTitle className="text-3xl leading-tight md:text-4xl">{title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>

            <div className="grid gap-2 rounded-lg bg-muted/40 p-4 text-sm text-muted-foreground">
              {address ? (
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{address}</span>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <Building2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{title}</span>
                </div>
              )}

              {partner.contact?.email ? (
                <Button asChild variant="link" className="h-auto justify-start p-0">
                  <a href={`mailto:${partner.contact.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    {partner.contact.email}
                  </a>
                </Button>
              ) : null}

              {partner.contact?.phone ? (
                <Button asChild variant="link" className="h-auto justify-start p-0">
                  <a href={`tel:${partner.contact.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {partner.contact.phone}
                  </a>
                </Button>
              ) : null}

              {!partner.contact?.phone && partner.contact?.whatsapp ? (
                <Button asChild variant="link" className="h-auto justify-start p-0">
                  <a href={`tel:${partner.contact.whatsapp}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {partner.contact.whatsapp}
                  </a>
                </Button>
              ) : null}

              {partner.website ? (
                <Button asChild variant="link" className="h-auto justify-start p-0">
                  <a href={partner.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    {partner.website.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </Button>
              ) : null}
            </div>
          </CardContent>

          {socialLinks.length > 0 ? (
            <CardFooter className="gap-2 pt-0">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <Button key={label} asChild variant="outline" size="icon">
                  <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{label}</span>
                  </a>
                </Button>
              ))}
            </CardFooter>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
