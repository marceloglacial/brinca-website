'use client'

import { getLocalizedValue } from '@/lib/locales'

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

  return (
    <article className="partner-card rounded-3xl bg-[#f1f1f1] px-6 py-7 md:px-9 md:py-8">
      <div className="flex flex-col gap-5 md:flex-row md:gap-7">
        {partner.logo && (
          <div className="flex-shrink-0 md:w-44 md:pt-1">
            <img
              src={partner.logo}
              alt={title}
              className="mx-auto h-auto w-full max-w-[140px] object-contain md:mx-0 md:max-w-[160px]"
            />
          </div>
        )}

        <div className="flex-grow">
          <h3 className="mb-2 text-3xl font-semibold leading-tight text-black md:text-[2.75rem]">
            {title}
          </h3>

          <p className="mb-7 max-w-4xl text-[1.1rem] leading-relaxed text-black/80 md:text-[1.2rem]">
            {description}
          </p>

          <div className="mb-6 space-y-1 text-[2rem] leading-tight">
            {address && <p className="font-light italic text-black/80">{address}</p>}

            {partner.contact?.email && (
              <a
                href={`mailto:${partner.contact.email}`}
                className="block font-light italic text-[#019f44] hover:underline"
              >
                {partner.contact.email}
              </a>
            )}

            {partner.contact?.phone && (
              <a
                href={`tel:${partner.contact.phone}`}
                className="block font-light italic text-[#019f44] hover:underline"
              >
                {partner.contact.phone}
              </a>
            )}

            {!partner.contact?.phone && partner.contact?.whatsapp && (
              <a
                href={`tel:${partner.contact.whatsapp}`}
                className="block font-light italic text-[#019f44] hover:underline"
              >
                {partner.contact.whatsapp}
              </a>
            )}

            {partner.website && (
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-light italic text-[#019f44] hover:underline"
              >
                {partner.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
          </div>

          <div className="flex items-center gap-6 text-[#018a39]">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="transition-colors hover:text-[#02662c]"
              >
                <span className="sr-only">WhatsApp</span>
                <svg
                  className="h-11 w-11"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.031 2C6.49 2 2 6.49 2 12.03a9.97 9.97 0 0 0 1.453 5.204L2 22l4.915-1.412a10 10 0 0 0 5.116 1.403h.001c5.54 0 10.03-4.49 10.03-10.03S17.57 2 12.031 2zm0 18.29h-.001a8.24 8.24 0 0 1-4.2-1.152l-.3-.178-2.917.838.846-2.845-.196-.292a8.24 8.24 0 0 1-1.27-4.431c.001-4.546 3.695-8.24 8.24-8.24 2.203 0 4.273.858 5.83 2.415a8.19 8.19 0 0 1 2.41 5.828c-.001 4.547-3.695 8.24-8.242 8.24zm4.517-6.197c-.247-.124-1.46-.72-1.687-.803-.227-.083-.392-.124-.558.124s-.64.803-.785.968c-.145.165-.29.186-.538.062-.247-.124-1.044-.384-1.99-1.224-.736-.655-1.233-1.464-1.378-1.712-.145-.247-.015-.381.109-.504.111-.11.248-.289.372-.434.124-.145.165-.248.248-.413.082-.165.041-.31-.021-.434-.062-.124-.558-1.344-.764-1.841-.201-.482-.405-.417-.558-.424l-.475-.008a.91.91 0 0 0-.661.31c-.227.247-.868.848-.868 2.067s.888 2.395 1.012 2.56c.124.165 1.747 2.666 4.233 3.738.591.255 1.052.407 1.412.521.593.188 1.132.162 1.558.098.475-.071 1.46-.598 1.667-1.175.206-.578.206-1.072.145-1.175-.061-.103-.226-.165-.474-.289z" />
                </svg>
              </a>
            )}

            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="transition-colors hover:text-[#02662c]"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24h11.495v-9.294H9.69V11.08h3.13V8.41c0-3.1 1.892-4.787 4.658-4.787 1.324 0 2.462.098 2.795.142V7.01h-1.918c-1.504 0-1.794.716-1.794 1.764v2.307h3.587l-.467 3.625h-3.12V24h6.115c.734 0 1.327-.593 1.327-1.326V1.326C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
            )}

            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="transition-colors hover:text-[#02662c]"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5zm8.95 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 6.3A5.7 5.7 0 1 1 6.3 12 5.7 5.7 0 0 1 12 6.3zm0 1.8A3.9 3.9 0 1 0 15.9 12 3.91 3.91 0 0 0 12 8.1z" />
                </svg>
              </a>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="transition-colors hover:text-[#02662c]"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554V14.9c0-1.324-.027-3.03-1.846-3.03-1.847 0-2.13 1.442-2.13 2.93v5.652H9.363V9h3.414v1.56h.05c.476-.9 1.636-1.85 3.368-1.85 3.6 0 4.266 2.37 4.266 5.45v6.292zM5.337 7.433a2.065 2.065 0 1 1 .001-4.129 2.065 2.065 0 0 1 0 4.13zM7.12 20.452H3.555V9H7.12v11.452zM22.225 0H1.771A1.77 1.77 0 0 0 0 1.771V22.23A1.77 1.77 0 0 0 1.771 24h20.454A1.77 1.77 0 0 0 24 22.229V1.77A1.77 1.77 0 0 0 22.225 0z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
