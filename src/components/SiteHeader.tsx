'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { BrazilFlagIcon, BrincaLogo, CanadaFlagIcon, MenuIcon } from '@/components/brinca/BrandIcons'
import { useSlug } from '@/components/SlugProvider'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const LOCALES = ['en', 'pt-BR'] as const
const FLAG_BY_LOCALE = {
  en: CanadaFlagIcon,
  'pt-BR': BrazilFlagIcon,
} as const

export default function SiteHeader({ locale }: { locale: string }) {
  const pathname = usePathname() || `/${locale}`
  const searchParams = useSearchParams()
  const search = searchParams && searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { slugMap: rawSlugMap } = useSlug()
  const [isMounted, setIsMounted] = React.useState(false)
  const [pages, setPages] = React.useState<any[]>([])

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  const slugMap = isMounted ? rawSlugMap : {}
  const segments = pathname.split('/').filter(Boolean)
  const hasLocale = segments.length > 0 && LOCALES.includes(segments[0] as (typeof LOCALES)[number])

  React.useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const res = await fetch(`/api/public/pages?locale=${encodeURIComponent(locale)}`)
        if (!res.ok) return
        const json = await res.json()
        if (mounted) setPages(json.pages || [])
      } catch {
        // Ignore nav fetch failures and fall back to static slugs.
      }
    })()

    return () => {
      mounted = false
    }
  }, [locale])

  const getLocaleHref = (targetLocale: (typeof LOCALES)[number]) => {
    let href = `/${targetLocale}${pathname}`

    if (hasLocale) {
      const localizedSlug = slugMap[targetLocale]

      if (localizedSlug) {
        href = `/${targetLocale}/${localizedSlug}${search}`
      } else if (segments.length > 1) {
        href = '/' + [targetLocale, ...segments.slice(1)].join('/') + search
      } else {
        href = '/' + targetLocale + search
      }
    } else {
      href = '/' + targetLocale + pathname + search
    }

    return href
  }

  return (
    <header>
      <nav className="flex gap-8">
        <div className="flex items-center justify-center lg:justify-start">
          <Link href={`/${locale}`} aria-label="Home">
            <BrincaLogo />
          </Link>
        </div>

        <div className="ml-auto flex items-center">
          <div className="hidden items-center gap-8 xl:flex">
            {pages.map((page: any) => {
              const slug = typeof page.slug === 'string' ? page.slug : page.slug?.[locale]
              if (!slug) return null

              return (
                <Link
                  key={page.id}
                  href={`/${locale}/${slug}`}
                  className="group relative inline whitespace-nowrap font-normal"
                >
                  <span className="transition-colors duration-200 ease-in-out group-hover:text-[#16a34a]">
                    {page.title?.[locale] ?? page.title ?? 'Page'}
                  </span>
                  <span className="absolute left-0 top-full mt-1 block h-[3px] w-0 rounded-full bg-[#16a34a] transition-all duration-200 ease-in-out group-hover:w-full" />
                </Link>
              )
            })}

            <div className="rotate-90 transform xl:rotate-0">|</div>

            <div className="flex items-center gap-4" aria-label="Language switcher">
              {LOCALES.map((targetLocale) => {
                const Flag = FLAG_BY_LOCALE[targetLocale]

                return (
                  <Link
                    key={targetLocale}
                    href={getLocaleHref(targetLocale)}
                    title={targetLocale === 'en' ? 'English' : 'Português'}
                    className="flex text-2xl transition-opacity duration-[0.25s] ease-out hover:opacity-50"
                  >
                    <Flag />
                  </Link>
                )
              })}
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <button className="flex p-2 xl:hidden" aria-label="Open navigation menu">
                <MenuIcon />
              </button>
            </DialogTrigger>

            <DialogContent
              showCloseButton={false}
              className="left-auto right-0 top-0 h-screen w-screen max-w-none translate-x-0 translate-y-0 gap-8 border-0 bg-white px-8 py-16 shadow-none duration-200 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full md:w-1/2 md:shadow-2xl"
            >
              <div className="absolute right-6 top-8 z-50">
                <DialogClose asChild>
                  <button className="flex p-2" aria-label="Close navigation menu">
                    <MenuIcon className="rotate-90" />
                  </button>
                </DialogClose>
              </div>

              <div className="flex flex-col gap-8 overflow-y-auto">
                {pages.map((page: any) => {
                  const slug = typeof page.slug === 'string' ? page.slug : page.slug?.[locale]
                  if (!slug) return null

                  return (
                    <DialogClose asChild key={page.id}>
                      <Link href={`/${locale}/${slug}`} className="inline text-[20px] leading-normal font-normal">
                        {page.title?.[locale] ?? page.title ?? 'Page'}
                      </Link>
                    </DialogClose>
                  )
                })}

                <div className="mx-auto flex items-center gap-4">
                  {LOCALES.map((targetLocale) => {
                    const Flag = FLAG_BY_LOCALE[targetLocale]

                    return (
                      <DialogClose asChild key={targetLocale}>
                        <Link
                          href={getLocaleHref(targetLocale)}
                          title={targetLocale === 'en' ? 'English' : 'Português'}
                          className="flex text-2xl transition-opacity duration-[0.25s] ease-out hover:opacity-50"
                        >
                          <Flag />
                        </Link>
                      </DialogClose>
                    )
                  })}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  )
}
