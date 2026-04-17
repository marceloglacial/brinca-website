import React from 'react'
import { notFound } from 'next/navigation'
import { Inter as FontSans } from 'next/font/google'
import SiteHeader from '@/components/SiteHeader'
import { SlugProvider } from '@/components/SlugProvider'
import SiteFooter from '@/components/Footer'
import { LOCALE_CODES } from '@/constants/locales'
import { isSupportedLocale } from '@/lib/locales'
import { cn } from '@/lib/utils'
import './globals.css'

const fontSans = FontSans({
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
  description: 'A blank template using Payload in a Next.js app.',
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
      <body className={cn('min-h-screen bg-background font-sans text-foreground antialiased', fontSans.variable)}>
        <SlugProvider>
          <React.Suspense fallback={null}>
            <SiteHeader locale={locale} />
          </React.Suspense>
          <main>{children}</main>
          <SiteFooter locale={locale} />
        </SlugProvider>
      </body>
    </html>
  )
}
