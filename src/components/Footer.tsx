'use client'

import Link from 'next/link'
import React from 'react'
import { BrazilFlagIcon, BrincaLogo, CanadaFlagIcon } from '@/components/brinca/BrandIcons'
import { buildSiteNav } from '@/lib/site-nav'

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
        // Ignore footer nav fetch failures.
      }
    })()

    return () => {
      mounted = false
    }
  }, [locale])

  const navItems = React.useMemo(
    () =>
      buildSiteNav(
        locale,
        pages.map((page: any) => ({
          id: page.id,
          slug: typeof page.slug === 'string' ? page.slug : page.slug?.[locale],
          title: page.title?.[locale] ?? page.title,
        })),
      ),
    [locale, pages],
  )

  return (
    <footer className="border-t border-gray-200 pt-8">
      <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <Link href={`/${locale}`} aria-label="Home">
          <BrincaLogo />
        </Link>

        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className="font-normal transition-colors duration-200 hover:text-[#16a34a]">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">|</div>

          <div className="flex items-center gap-4">
            <Link href="/pt-BR" title="Português" className="flex text-2xl transition-opacity duration-[0.25s] ease-out hover:opacity-50">
              <BrazilFlagIcon />
            </Link>
            <Link href="/en" title="English" className="flex text-2xl transition-opacity duration-[0.25s] ease-out hover:opacity-50">
              <CanadaFlagIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
