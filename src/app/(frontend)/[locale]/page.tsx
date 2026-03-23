import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import type { Page, Event } from '@/payload-types'
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

  // Fetch latest events
  const { docs: events } = await payload.find({
    collection: 'events',
    locale: locale as any,
    limit: 5,
    sort: '-date',
  })

  return (
    <div className="home">
      <div className="content">
        {/* Events List */}
        {events.length > 0 && (
          <div className="section">
            <h2>{locale === 'pt-BR' ? 'Eventos Recentes' : 'Recent Events'}</h2>
            <div className="grid">
              {events.map((event: Event) => {
                const eventSlug = getLocalizedValue(event.slug, locale)
                return (
                  <Link key={event.id} href={`/${locale}/events/${eventSlug}`}>
                    <div className="card">
                      <h3>{getLocalizedValue(event.title, locale)}</h3>
                      <p className="date">
                        {new Date(event.date).toLocaleDateString(locale, {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Pages List */}
        {pages.length > 0 && (
          <div className="section">
            <h2>{locale === 'pt-BR' ? 'Páginas' : 'Pages'}</h2>
            <div className="grid">
              {pages.map((page: Page) => {
                const pageSlug = getLocalizedValue(page.slug, locale)
                return (
                  <Link key={page.id} href={`/${locale}/${pageSlug}`}>
                    <div className="card">
                      <h3>{getLocalizedValue(page.title, locale)}</h3>
                      <p>Slug: /{pageSlug}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .section {
          margin-bottom: 3rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }
        .card {
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          transition: border-color 0.2s;
        }
        .card:hover {
          border-color: #0070f3;
        }
        .card h3 {
          margin: 0 0 0.5rem 0;
        }
        .date {
          color: #666;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  )
}
