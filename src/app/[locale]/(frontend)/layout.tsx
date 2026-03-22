import React from 'react'
import './styles.css'

const LOCALES = ['en', 'pt-BR']

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale,
  }))
}

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
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
        <main>{children}</main>
      </body>
    </html>
  )
}
