'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

const LOCALE_LABELS: Record<string, string> = { 'en': 'English', 'pt-BR': 'Português' }
const LOCALES = Object.keys(LOCALE_LABELS)

export default function SiteHeader({ locale }: { locale: string }) {
  const pathname = usePathname() || `/${locale}`
  const searchParams = useSearchParams()
  const search = searchParams && searchParams.toString() ? `?${searchParams.toString()}` : ''

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
              const newSegments = [l, ...segments.slice(1)]
              href = '/' + newSegments.join('/') + search
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
