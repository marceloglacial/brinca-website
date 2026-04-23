import React from 'react'
import { notFound } from 'next/navigation'
import { Mulish } from 'next/font/google'
import SiteHeader from '@/components/SiteHeader'
import { SlugProvider } from '@/components/SlugProvider'
import SiteFooter from '@/components/Footer'
import { LOCALE_CODES } from '@/constants/locales'
import { isSupportedLocale } from '@/lib/locales'
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

export const SITE_NAME = 'Brinca'

export const metadata = {
  description: 'Your Brazilian community in Ottawa-Gatineau!',
  title: SITE_NAME,
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
      <body className={cn('bg-background font-sans text-foreground antialiased', fontSans.variable)}>
        <SlugProvider>
          <div className="px-4 md:px-6 lg:px-8">
            <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col gap-8 p-4 md:gap-16 md:p-6 lg:my-8 2xl:p-0">
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
