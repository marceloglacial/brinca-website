import { getPayload } from 'payload'
import Link from 'next/link'
import config from '@/payload.config'
import { getLocalizedValue } from '@/lib/locales'
import { formatDate } from '@/lib/formatDate'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function CalendarList({ locale, title, limit }: { locale: string; title?: string; limit?: number }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: events } = await payload.find({
    collection: 'calendars',
    sort: 'date',
    locale: locale as any,
    ...(limit ? { limit } : {}),
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
    <div className="calendar-list-section mt-16 pt-8 border-t border-gray-200">
      {title && <h2>{title}</h2>}
      <div className="calendar-grid gap-8 mt-6">
        {Object.entries(groups).map(([key, { label, events }]) => (
          <Card key={key}>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Calendar
              </Badge>
              <CardTitle className="text-xl">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
              {events.map((event) => {
                const slug = typeof event.slug === 'string' ? event.slug : event.slug?.[locale]
                const href = `/${locale}/calendars/${slug}`
                return (
                  <li key={event.id}>
                    <Link href={href} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                      {event.thumbnail && (
                        <img
                          src={event.thumbnail}
                          alt={getLocalizedValue(event.title, locale)}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <span>
                        {formatDate(event.date, locale, { day: 'numeric', month: 'short' })} -{' '}
                        {getLocalizedValue(event.title, locale)}
                      </span>
                    </Link>
                  </li>
                )
              })}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
