import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getLocalizedValue } from '@/lib/lexical'
import { formatDate } from '@/lib/formatDate'
import './styles.css'

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
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
              {events.map((event: any) => {
                const eventSlug = getLocalizedValue(event.slug, locale)
                return (
                  <Link key={event.id} href={`/${locale}/events/${eventSlug}`}>
                    <div className="card">
                      {event.thumbnail ? (
                        <img className="card-thumb" src={event.thumbnail} alt={getLocalizedValue(event.title, locale)} />
                      ) : null}
                      <h3>{getLocalizedValue(event.title, locale)}</h3>
                      <p className="date">
                        {formatDate(event.date, locale, {
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
      </div>

      <style>{`
        .card-thumb { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem }
        .card h3 { margin: 0 0 0.5rem 0 }
      `}</style>
    </div>
  )
}
