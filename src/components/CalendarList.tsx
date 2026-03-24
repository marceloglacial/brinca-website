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

  // Group events by month/year
  const groups: Record<string, any[]> = {}
  for (const event of events) {
    const d = new Date(event.date)
    const key = formatDate(d, locale, { month: 'long', year: 'numeric' })
    if (!groups[key]) groups[key] = []
    groups[key].push(event)
  }

  return (
    <div className="calendar-list-section">
      <h2>Calendar</h2>
      <div className="calendar-grid">
        {Object.keys(groups).map((month) => (
          <div key={month} className="calendar-month">
            <h3>{month}</h3>
            <ul>
              {groups[month].map((event) => {
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
