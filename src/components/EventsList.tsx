import { getPayload } from 'payload'
import Link from 'next/link'
import config from '@/payload.config'
import { getLocalizedValue } from '@/lib/locales'
import { formatDate } from '@/lib/formatDate'
import { Card } from '@/components/ui/card'

export default async function EventsList({ locale, title, limit }: { locale: string; title?: string; limit?: number }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: events } = await payload.find({
    collection: 'events',
    sort: '-date',
    locale: locale as any,
    ...(limit ? { limit } : {}),
  })

  if (!events || events.length === 0) return null

  return (
    <div className="events-list-section">
      {title && <h2>{title}</h2>}
      <div className="events-grid gap-4 mt-4">
        {events.map((event) => {
          const slug = typeof event.slug === 'string' ? event.slug : event.slug?.[locale]
          const href = `/${locale}/events/${slug}`

          return (
            <Card key={event.id} className="p-4 border-0 bg-white hover:shadow-md transition-shadow">
              <Link href={href} className="flex gap-4 items-start">
                {event.thumbnail && (
                  <div className="flex-shrink-0">
                    <img
                      src={event.thumbnail}
                      alt={getLocalizedValue(event.title, locale)}
                      className="w-[120px] h-[80px] object-cover rounded-md"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg hover:underline">
                    {getLocalizedValue(event.title, locale)}
                  </h3>
                  <p className="text-gray-600 font-medium mt-1">
                    {formatDate(event.date, locale, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
