'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { useSlug } from '@/components/SlugProvider'

const LOCALE_LABELS: Record<string, string> = { en: 'English', 'pt-BR': 'Português' }
const LOCALES = Object.keys(LOCALE_LABELS)

export default function SiteHeader({ locale }: { locale: string }) {
  const pathname = usePathname() || `/${locale}`
  const searchParams = useSearchParams()
  const search = searchParams && searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { slugMap } = useSlug()

  const segments = pathname.split('/').filter(Boolean)
  const hasLocale = segments.length > 0 && LOCALES.includes(segments[0])

  const [menuOpen, setMenuOpen] = React.useState(false)

  // Close menu on route change
  React.useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // client-side pages fetch
  const [pages, setPages] = React.useState<any[]>([])
  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`/api/public/pages?locale=${encodeURIComponent(locale)}`)
        if (!res.ok) return
        const json = await res.json()
        if (mounted) setPages(json.pages || [])
      } catch (e) {
        // ignore
      }
    })()
    return () => {
      mounted = false
    }
  }, [locale])

  const localeLinks = LOCALES.map((l, index) => {
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
      <Link key={index} href={href} className={isActive ? 'active' : ''}>
        {LOCALE_LABELS[l] ?? l}
      </Link>
    )
  })

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="logo" href={`/${locale}`}>
          Brinca
        </Link>

        <div className="header-actions">
          <div className="pages-list" aria-hidden={!locale}>
            {pages.length > 0 && (
              <div className="pages-scroll">
                {pages.map((p: any) => {
                  const slug = typeof p.slug === 'string' ? p.slug : p.slug?.[locale]
                  return (
                    <Link key={p.id} href={`/${locale}/${slug}`} className="page-link">
                      {p.title?.[locale] ?? p.title ?? 'Page'}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <nav className="locale-switcher" aria-label="Language switcher">
          {localeLinks}
        </nav>

        <button
          className="hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {pages.length > 0 && (
            <div className="mobile-pages">
              {pages.map((p: any) => {
                const slug = typeof p.slug === 'string' ? p.slug : p.slug?.[locale]
                return (
                  <Link key={p.id} href={`/${locale}/${slug}`} className="page-link">
                    {p.title?.[locale] ?? p.title ?? 'Page'}
                  </Link>
                )
              })}
            </div>
          )}
          <nav className="mobile-locale-switcher" aria-label="Language switcher">
            {localeLinks}
          </nav>
        </div>
      )}

      <style>{`
        .pages-list {
          display: flex;
          align-items: center;
          margin-right: 1rem;
        }
        .pages-scroll {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding: 0.25rem 0;
        }
        .page-link {
          white-space: nowrap;
          padding: 0.25rem 0.5rem;
          color: inherit;
          text-decoration: none;
          border-radius: 4px;
        }
        .page-link:hover {
          background: rgba(255,255,255,0.05);
        }
      `}</style>
    </header>
  )
}
