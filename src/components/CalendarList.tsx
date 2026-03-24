import { getPayload } from 'payload'
import Link from 'next/link'
import config from '@/payload.config'
import { getLocalizedValue } from '@/lib/lexical'
import { formatDate } from '@/lib/formatDate'

export default async function CalendarList({ locale }: { locale: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: events } = await payload.find({
    collection: 'calendars',
    sort: 'date',
    locale: locale as any,
  })

  if (!events || events.length === 0) return null

  const groups: Record<
    string,
    {
      label: string
      events: any[]
    }
  > = {}

  for (const event of events) {
    const d = new Date(event.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!groups[key]) {
      const label = formatDate(new Date(d.getFullYear(), d.getMonth(), 1), locale, {
        month: 'long',
        year: 'numeric',
      })
      groups[key] = { label: label || `${d.getFullYear()}-${d.getMonth()}`, events: [] }
    }

    groups[key].events.push(event)
  }

  return (
    <div className="calendar-list-section">
      <h2>Calendar</h2>
      <div className="calendar-grid">
        {Object.entries(groups).map(([key, { label, events }]) => (
          <div key={key} className="calendar-month">
            <h3>{label}</h3>
            <ul>
              {events.map((event) => {
                const slug = typeof event.slug === 'string' ? event.slug : event.slug?.[locale]
                const href = `/${locale}/calendars/${slug}`
                return (
                  <li key={event.id} className="calendar-event">
                    <Link href={href}>
                      {formatDate(event.date, locale, {
                        day: 'numeric',
                        month: 'short',
                      })}{' '}
                      - {getLocalizedValue(event.title, locale)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        .calendar-list-section {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid #eaeaea;
        }
        .calendar-month {
          margin-bottom: 1.5rem;
        }
        .calendar-event {
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  )
}
