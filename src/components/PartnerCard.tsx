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

  return (
    <article className="partner-card border-b pb-8 last:border-b-0">
      <div className="flex gap-6 flex-col md:flex-row">
        {partner.logo && (
          <div className="flex-shrink-0 md:w-32 md:h-32">
            <img src={partner.logo} alt={title} className="w-full h-auto object-contain max-h-32" />
          </div>
        )}

        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>

          <p className="text-gray-600 mb-4">{description}</p>

          <div className="space-y-2 text-sm mb-4">
            {partner.contact?.email && (
              <div>
                <strong>Email:</strong>{' '}
                <a
                  href={`mailto:${partner.contact.email}`}
                  className="text-green-600 hover:underline"
                >
                  {partner.contact.email}
                </a>
              </div>
            )}

            {partner.contact?.phone && (
              <div>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${partner.contact.phone}`} className="text-green-600 hover:underline">
                  {partner.contact.phone}
                </a>
              </div>
            )}

            {partner.contact?.whatsapp && (
              <div>
                <strong>WhatsApp:</strong>{' '}
                <a
                  href={`https://wa.me/${partner.contact.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  {partner.contact.whatsapp}
                </a>
              </div>
            )}

            {address && (
              <div>
                <strong>Address:</strong> {address}
              </div>
            )}

            {partner.website && (
              <div>
                <strong>Website:</strong>{' '}
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  {partner.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
          </div>

          {/* Social Media Links */}
          <div className="flex gap-3">
            {partner.social?.facebook && (
              <a
                href={
                  partner.social.facebook.startsWith('http')
                    ? partner.social.facebook
                    : `https://facebook.com/${partner.social.facebook}`
                }
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="text-gray-600 hover:text-blue-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            )}

            {partner.social?.instagram && (
              <a
                href={
                  partner.social.instagram.startsWith('http')
                    ? partner.social.instagram
                    : `https://instagram.com/${partner.social.instagram.replace('@', '')}`
                }
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="text-gray-600 hover:text-pink-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
              </a>
            )}

            {partner.social?.linkedin && (
              <a
                href={
                  partner.social.linkedin.startsWith('http')
                    ? partner.social.linkedin
                    : `https://linkedin.com/company/${partner.social.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="text-gray-600 hover:text-blue-400"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
