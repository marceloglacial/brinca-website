import { getPayload } from 'payload'
import Link from 'next/link'
import config from '@/payload.config'
import { getLocalizedValue } from '@/lib/lexical'
import { formatDate } from '@/lib/formatDate'

export default async function EventsList({ locale }: { locale: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: events } = await payload.find({
    collection: 'events',
    sort: '-date',
    locale: locale as any,
  })

  if (!events || events.length === 0) return null

  return (
    <div className="events-list-section">
      <h2>Events</h2>
      <div className="events-grid">
        {events.map((event) => {
          const slug = typeof event.slug === 'string' ? event.slug : event.slug?.[locale]
          const href = `/${locale}/events/${slug}`

          return (
            <div key={event.id} className="event-card">
              <h3>
                <Link href={href}>{getLocalizedValue(event.title, locale)}</Link>
              </h3>
              <p className="event-date">
                <Link href={href}>
                  {formatDate(event.date, locale, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Link>
              </p>
            </div>
          )
        })}
      </div>

      <style>{`
        .events-list-section {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid #eaeaea;
        }
        .events-grid {
          display: grid;
          gap: 1rem;
          margin-top: 1rem;
        }
        .event-card {
          padding: 0.75rem 0;
        }
        .event-date {
          color: #666;
          font-weight: 500;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  )
}
