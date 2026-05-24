import { getPayload } from 'payload'
import CollectionGridSection from '@/components/brinca/CollectionGridSection'
import config from '@/payload.config'
import { getLocalizedValue } from '@/lib/locales'

export default async function CalendarList({
  locale,
  title,
  limit,
}: {
  locale: string
  title?: string
  limit?: number
}) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: events } = await payload.find({
    collection: 'calendars',
    sort: '-date',
    locale: locale as any,
    where: {
      status: { equals: 'published' },
    },
    ...(limit ? { limit } : {}),
  })

  if (!events || events.length === 0) return null

  return (
    <CollectionGridSection
      locale={locale}
      title={title}
      items={events.map((event) => {
        const slug = typeof event.slug === 'string' ? event.slug : event.slug?.[locale]

        return {
          id: event.id,
          href: `/${locale}/calendars/${slug}`,
          thumbnail: event.thumbnail,
          title: getLocalizedValue(event.title, locale),
          date: event.date,
        }
      })}
    />
  )
}
