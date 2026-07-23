import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import { getPayload } from 'payload'
import SiteHeader, { type NavigationPage } from '@/components/SiteHeader'
import { SlugProvider } from '@/components/SlugProvider'
import SiteFooter from '@/components/Footer'
import { LOCALE_CODES } from '@/constants/locales'
import { isSupportedLocale } from '@/lib/locales'
import { buildLocaleMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'
import config from '@/payload.config'
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

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: 'pages',
    locale,
    where: {
      and: [{ showInNavbar: { equals: true } }, { status: { equals: 'published' } }],
    },
    limit: 100,
    sort: 'title',
    select: {
      title: true,
      slug: true,
    },
  })
  const navigationPages: NavigationPage[] = docs
    .filter((page): page is typeof page & { slug: string; title: string } => {
      return typeof page.slug === 'string' && typeof page.title === 'string'
    })
    .map((page) => ({
      id: String(page.id),
      slug: page.slug,
      title: page.title,
    }))

  return (
    <html lang={locale}>
      <body
        className={cn('bg-background font-sans text-foreground antialiased', fontSans.variable)}
      >
        <SlugProvider>
          <div className="px-4 md:px-6 lg:px-8">
            <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-4 md:py-6 lg:py-8">
              <SiteHeader locale={locale} pages={navigationPages} />
              <main className="flex-1">{children}</main>
              <SiteFooter locale={locale} />
            </div>
          </div>
        </SlugProvider>
      </body>
    </html>
  )
}
