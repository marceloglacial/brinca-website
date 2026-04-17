'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function SiteFooter({ locale }: { locale: string }) {
  const [pages, setPages] = React.useState<any[]>([])

  React.useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const res = await fetch(`/api/public/pages?locale=${encodeURIComponent(locale)}`)
        if (!res.ok) return
        const json = await res.json()
        if (mounted) setPages(json.pages || [])
      } catch {
        // ignore
      }
    })()

    return () => {
      mounted = false
    }
  }, [locale])

  return (
    <footer className="site-footer mt-12 py-4">
      <Separator className="mb-4" />
      <div className="site-footer-inner max-w-4xl mx-auto px-8 flex items-center justify-between gap-4">
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

        <Button asChild variant="ghost" size="sm">
          <Link href="/admin">Dashboard</Link>
        </Button>
      </div>
    </footer>
  )
}
