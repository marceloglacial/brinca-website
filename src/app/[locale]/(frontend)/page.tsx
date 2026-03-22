import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import type { Page } from '@/payload-types'
import config from '@/payload.config'
import './styles.css'

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'pt-BR', label: 'Português' },
]

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({
    locale: locale.code,
  }))
}

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Fetch pages with locale
  const { docs: pages } = await payload.find({
    collection: 'pages',
    locale: locale as any,
    limit: 100,
  })

  // Helper to get localized value
  const getLocalizedValue = (value: any): string => {
    if (typeof value === 'string') return value
    if (typeof value === 'object' && value !== null && locale in value) {
      return value[locale]
    }
    return ''
  }

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>

        {/* Locale Switcher */}
        <div className="locale-switcher">
          {LOCALES.map((loc) => (
            <a key={loc.code} className={locale === loc.code ? 'active' : ''} href={`/${loc.code}`}>
              {loc.label}
            </a>
          ))}
        </div>

        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}

        {/* Pages List */}
        {pages.length > 0 && (
          <div className="pages-list">
            <h2>Pages</h2>
            {pages.map((page: Page) => (
              <div key={page.id} className="page-item">
                <h3>{getLocalizedValue(page.title)}</h3>
                <p>Slug: /{getLocalizedValue(page.slug)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>

      <div className="footer">Footer</div>
    </div>
  )
}
