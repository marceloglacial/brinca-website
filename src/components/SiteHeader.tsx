'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import React from 'react'
import { BrazilFlagIcon, BrincaLogo, CanadaFlagIcon, MenuIcon } from '@/components/brinca/BrandIcons'
import { useSlug } from '@/components/SlugProvider'
import type { LocaleCode } from '@/constants/locales'

const LOCALES = ['en', 'pt-BR'] as const
const FLAG_BY_LOCALE = {
  en: CanadaFlagIcon,
  'pt-BR': BrazilFlagIcon,
} as const

export type NavigationPage = {
  id: string
  slug: string
  title: string
}

type LanguageSwitcherProps = {
  locale: LocaleCode
  onNavigate?: () => void
  tabIndex?: number
}

function LanguageSwitcher({ locale, onNavigate, tabIndex }: LanguageSwitcherProps) {
  const pathname = usePathname() || `/${locale}`
  const searchParams = useSearchParams()
  const search = searchParams && searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { slugMap } = useSlug()
  const segments = pathname.split('/').filter(Boolean)
  const hasLocale = segments.length > 0 && LOCALES.includes(segments[0] as (typeof LOCALES)[number])

  const getLocaleHref = (targetLocale: (typeof LOCALES)[number]) => {
    let href = `/${targetLocale}${pathname}`

    if (hasLocale) {
      const isLocaleRoot = segments.length === 1
      const localizedSlug = slugMap[targetLocale]

      if (!isLocaleRoot && localizedSlug) {
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

  return LOCALES.map((targetLocale) => {
    const Flag = FLAG_BY_LOCALE[targetLocale]

    return (
      <Link
        key={targetLocale}
        href={getLocaleHref(targetLocale)}
        title={targetLocale === 'en' ? 'English' : 'Português'}
        className="flex text-2xl transition-opacity duration-[0.25s] ease-out hover:opacity-50"
        onClick={onNavigate}
        tabIndex={tabIndex}
      >
        <Flag />
      </Link>
    )
  })
}

export default function SiteHeader({
  locale,
  pages,
}: {
  locale: LocaleCode
  pages: NavigationPage[]
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

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
            {pages.map((page) => (
              <Link
                key={page.id}
                href={`/${locale}/${page.slug}`}
                className="group relative inline whitespace-nowrap font-normal"
              >
                <span className="transition-colors duration-200 ease-in-out group-hover:text-[#16a34a]">
                  {page.title}
                </span>
                <span className="absolute left-0 top-full mt-1 block h-[3px] w-0 rounded-full bg-[#16a34a] transition-all duration-200 ease-in-out group-hover:w-full" />
              </Link>
            ))}

            <div className="rotate-90 transform xl:rotate-0">|</div>

            <div className="flex items-center gap-4" aria-label="Language switcher">
              <React.Suspense fallback={null}>
                <LanguageSwitcher locale={locale} />
              </React.Suspense>
            </div>
          </div>

          <div className="xl:hidden">
            <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <Dialog.Trigger asChild>
                <button
                  type="button"
                  className="flex cursor-pointer p-2"
                  aria-label="Open navigation menu"
                >
                  <MenuIcon />
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="mobile-menu-overlay fixed inset-0 z-40 bg-black/80" />
                <Dialog.Content
                  id="mobile-navigation-menu"
                  aria-describedby={undefined}
                  className="mobile-menu-panel fixed right-0 top-0 z-50 flex h-dvh w-screen flex-col gap-8 overflow-y-auto bg-white px-8 py-16 shadow-none focus:outline-none md:w-1/2 md:shadow-2xl"
                >
                  <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="absolute right-6 top-8 z-[60] flex cursor-pointer p-2"
                      aria-label="Close navigation menu"
                    >
                      <X className="h-5 w-5 text-[#16a34a]" aria-hidden="true" />
                    </button>
                  </Dialog.Close>

                  <div className="flex flex-col gap-8 overflow-y-auto">
                    {pages.map((page) => (
                      <Dialog.Close asChild key={page.id}>
                        <Link
                          href={`/${locale}/${page.slug}`}
                          className="inline text-[20px] leading-normal font-normal"
                        >
                          {page.title}
                        </Link>
                      </Dialog.Close>
                    ))}

                    <div className="mx-auto flex items-center gap-4">
                      <React.Suspense fallback={null}>
                        <LanguageSwitcher
                          locale={locale}
                          onNavigate={() => setIsMobileMenuOpen(false)}
                        />
                      </React.Suspense>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </nav>
    </header>
  )
}
