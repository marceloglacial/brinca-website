import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import SiteHeader from '@/components/SiteHeader'
import { SlugProvider } from '@/components/SlugProvider'
import SiteFooter from '@/components/Footer'
import { LOCALE_CODES } from '@/constants/locales'
import { isSupportedLocale } from '@/lib/locales'
import { buildLocaleMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'
import './globals.css'

const fontSans = Mulish({
  subsets: ['latin'],
  variable: '--font-sans',
})

export async function generateStaticParams() {
  return LOCALE_CODES.map((locale) => ({
    locale,
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await props.params
  return buildLocaleMetadata(locale)
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { children, params } = props
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body
        className={cn('bg-background font-sans text-foreground antialiased', fontSans.variable)}
      >
        <SlugProvider>
          <div className="px-4 md:px-6 lg:px-8">
            <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-4 md:py-6 lg:py-8">
              <React.Suspense fallback={null}>
                <SiteHeader locale={locale} />
              </React.Suspense>
              <main className="flex-1">{children}</main>
              <SiteFooter locale={locale} />
            </div>
          </div>
        </SlugProvider>
      </body>
    </html>
  )
}
