'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { useSlug } from '@/components/SlugProvider'

const LOCALE_LABELS: Record<string, string> = { 'en': 'English', 'pt-BR': 'Português' }
const LOCALES = Object.keys(LOCALE_LABELS)

export default function SiteHeader({ locale }: { locale: string }) {
  const pathname = usePathname() || `/${locale}`
  const searchParams = useSearchParams()
  const search = searchParams && searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { slugMap } = useSlug()

  const segments = pathname.split('/').filter(Boolean)
  const hasLocale = segments.length > 0 && LOCALES.includes(segments[0])

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="logo" href={`/${locale}`}>
          Brinca
        </Link>

        <div className="header-actions">
          <a className="admin" href="/admin">Dashboard</a>
        </div>

        <nav className="locale-switcher" aria-label="Language switcher">
          {LOCALES.map((l) => {
            let href = `/${l}${pathname}`

            if (hasLocale) {
              const localizedSlug = slugMap[l]
              // If we have a mapped slug for this locale, use it. 
              // Otherwise, just replace the locale prefix if it's more than just the locale (i.e. not the homepage)
              if (localizedSlug) {
                href = `/${l}/${localizedSlug}${search}`
              } else if (segments.length > 1) {
                const newSegments = [l, ...segments.slice(1)]
                href = '/' + newSegments.join('/') + search
              } else {
                href = '/' + l + search
              }
            } else {
              href = '/' + l + pathname + search
            }

            const isActive = l === locale

            return (
              <Link key={l} href={href} className={isActive ? 'active' : ''}>
                {LOCALE_LABELS[l] ?? l}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
