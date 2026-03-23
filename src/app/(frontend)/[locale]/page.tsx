import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import type { Page } from '@/payload-types'
import { LOCALES } from '@/constants/locales'
import { getLocalizedValue } from '@/lib/lexical'
import config from '@/payload.config'
import './styles.css'

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

  return (
    <div className="home">
      <div className="content">
        {/* Pages List */}
        {pages.length > 0 && (
          <div className="pages-list">
            <h2>Pages</h2>
            {pages.map((page: Page) => {
              const pageSlug = getLocalizedValue(page.slug, locale)
              return (
                <Link key={page.id} href={`/${locale}/${pageSlug}`}>
                  <div className="page-item">
                    <h3>{getLocalizedValue(page.title, locale)}</h3>
                    <p>Slug: /{pageSlug}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
