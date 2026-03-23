import React from 'react'
import SiteHeader from '@/components/SiteHeader'
import { SlugProvider } from '@/components/SlugProvider'
import './styles.css'

const LOCALES = ['en', 'pt-BR']

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
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

  return (
    <html lang={locale}>
      <body>
        <SlugProvider>
          <SiteHeader locale={locale} />
          <main>{children}</main>
        </SlugProvider>
      </body>
    </html>
  )
}
