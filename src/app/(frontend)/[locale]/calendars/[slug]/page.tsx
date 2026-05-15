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
    const { docs: items } = await payload.find({
      collection: 'calendars',
      locale: locale as any,
      limit: 100,
    })

    items.forEach((item) => {
      const slug = typeof item.slug === 'string' ? item.slug : item.slug?.[locale]
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
    collection: 'calendars',
    where: { slug: { equals: slug } },
    locale: locale as any,
    limit: 1,
  })
  const item = docs[0]
  const title = item ? withSiteName(getLocalizedValue(item.title, locale)) : undefined
  return { title }
}

export default async function CalendarPageRoute(props: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await props.params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Find the calendar item by slug
  const { docs } = await payload.find({
    collection: 'calendars',
    where: {
      slug: { equals: slug },
    },
    locale: locale as any,
    limit: 1,
  })

  const item = docs[0]

  if (!item) {
    notFound()
  }

  // Fetch all localized slugs for this item
  const slugMap: Record<string, string> = {}
  for (const l of LOCALE_CODES) {
    const { docs: localizedDocs } = await payload.find({
      collection: 'calendars',
      where: { id: { equals: item.id } },
      locale: l as any,
      limit: 1,
    })
    if (localizedDocs[0]?.slug) {
      slugMap[l] = `calendars/${localizedDocs[0].slug}`
    }
  }

  const calendarTitle = getLocalizedValue(item.title, locale)

  return (
    <div className="w-full py-8">
      <SetSlug slugs={slugMap} />
      <PageHeading title={calendarTitle} />
      <div className="mb-6 mt-4 text-sm text-center text-muted-foreground">
        {formatDate(item.date, locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </div>
      <div className="w-full">
        {item.components?.map((block, index) => (
          <BlockRenderer key={block.id ?? index} block={block} locale={locale} />
        ))}
      </div>
    </div>
  )
}
