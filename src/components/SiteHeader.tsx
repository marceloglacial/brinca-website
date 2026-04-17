'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { useSlug } from '@/components/SlugProvider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const LOCALE_LABELS: Record<string, string> = { en: 'English', 'pt-BR': 'Português' }
const LOCALES = Object.keys(LOCALE_LABELS)

export default function SiteHeader({ locale }: { locale: string }) {
  const pathname = usePathname() || `/${locale}`
  const searchParams = useSearchParams()
  const search = searchParams && searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { slugMap: rawSlugMap } = useSlug()
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => { setIsMounted(true) }, [])
  // Only use slugMap after mount to avoid server/client mismatch
  const slugMap = isMounted ? rawSlugMap : {}

  const segments = pathname.split('/').filter(Boolean)
  const hasLocale = segments.length > 0 && LOCALES.includes(segments[0])

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

  return (
    <header className="site-header">
      <Card className="site-header-inner mx-auto flex items-center justify-between gap-4 border-border/60 px-6 py-3 shadow-none">
        <Button asChild variant="ghost" className="text-lg font-semibold">
          <Link href={`/${locale}`}>
            Brinca
          </Link>
        </Button>

        <div className="header-actions flex-1">
          <div className="pages-list flex items-center mr-4" aria-hidden={!locale}>
            {pages.length > 0 && (
              <div className="pages-scroll flex gap-2 overflow-x-auto py-1">
                {pages.map((p: any) => {
                  const slug = typeof p.slug === 'string' ? p.slug : p.slug?.[locale]
                  return (
                    <Button key={p.id} asChild variant="ghost" size="sm">
                      <Link href={`/${locale}/${slug}`}>
                        {p.title?.[locale] ?? p.title ?? 'Page'}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <nav className="locale-switcher flex gap-1" aria-label="Language switcher">
          {LOCALES.map((l, index) => {
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
              <Button
                key={index}
                asChild
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
              >
                <Link href={href}>
                  {LOCALE_LABELS[l] ?? l}
                </Link>
              </Button>
            )
          })}
        </nav>
      </Card>
    </header>
  )
}
