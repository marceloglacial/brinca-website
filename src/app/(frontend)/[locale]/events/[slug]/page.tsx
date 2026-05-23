import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { getLocalizedValue } from '@/lib/locales'
import BlockRenderer from '@/components/BlockRenderer'
import PageHeading from '@/components/brinca/PageHeading'
import config from '@/payload.config'
import { formatDate } from '@/lib/formatDate'
import { SetSlug } from '@/components/SlugProvider'
import { LOCALE_CODES } from '@/constants/locales'
import { withSiteName } from '@/lib/metadata'

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of LOCALE_CODES) {
    const { docs: events } = await payload.find({
      collection: 'events',
      locale: locale as any,
      limit: 100,
    })

    events.forEach((event) => {
      const slug = typeof event.slug === 'string' ? event.slug : event.slug?.[locale]
      if (slug) {
        params.push({ locale, slug })
      }
    })
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    locale: locale as any,
    limit: 1,
  })
  const event = docs[0]
  const title = event ? withSiteName(getLocalizedValue(event.title, locale)) : undefined
  return { title }
}

export default async function EventPageRoute(props: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await props.params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Find the event by slug
  const { docs } = await payload.find({
    collection: 'events',
    where: {
      slug: { equals: slug },
    },
    locale: locale as any,
    limit: 1,
  })

  const event = docs[0]

  if (!event) {
    notFound()
  }

  // Fetch all localized slugs for this event
  const slugMap: Record<string, string> = {}
  for (const l of LOCALE_CODES) {
    const { docs: localizedDocs } = await payload.find({
      collection: 'events',
      where: { id: { equals: event.id } },
      locale: l as any,
      limit: 1,
    })
    if (localizedDocs[0]?.slug) {
      slugMap[l] = `events/${localizedDocs[0].slug}`
    }
  }

  const eventTitle = getLocalizedValue(event.title, locale)

  return (
    <div className="w-full py-8">
      <SetSlug slugs={slugMap} />
      <PageHeading title={eventTitle} />
      <div className="mb-6 mt-4 text-sm text-center text-muted-foreground">
        {formatDate(event.date, locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </div>
      <div className="w-full">
        {event.components?.map((block, index) => (
          <BlockRenderer key={block.id ?? index} block={block} locale={locale} />
        ))}
      </div>
    </div>
  )
}
