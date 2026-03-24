import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { getLocalizedValue, renderLexical } from '@/lib/lexical'
import config from '@/payload.config'
import { formatDate } from '@/lib/formatDate'
import { SetSlug } from '@/components/SlugProvider'
import CloudinaryGallery from '@/components/CloudinaryGallery'
import InstagramEmbed from '@/components/InstagramEmbed'
import { LOCALE_CODES } from '@/constants/locales'

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
  const titleValue = item ? getLocalizedValue(item.title, locale) : 'Calendar'
  const title = `${titleValue} | Brinca`
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

  const descriptionValue =
    typeof item.description === 'object' && item.description !== null
      ? locale in (item.description as Record<string, any>)
        ? (item.description as Record<string, any>)[locale]
        : item.description
      : item.description

  return (
    <div className="calendar-item-view">
      <SetSlug slugs={slugMap} />

      <div className="calendar-item-header">
        <h1>{getLocalizedValue(item.title, locale)}</h1>
        <p className="calendar-date">
          {formatDate(item.date, locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <div className="calendar-item-description">
        {descriptionValue && typeof descriptionValue === 'object' && (descriptionValue as any).root ? (
          <div>{renderLexical((descriptionValue as any).root.children)}</div>
        ) : descriptionValue ? (
          <div>{descriptionValue as any}</div>
        ) : null}
      </div>

      {item.gallery?.cloudinaryFolder && (
        <CloudinaryGallery
          folderPath={item.gallery.cloudinaryFolder}
          title={locale === 'pt-BR' ? 'Galeria' : 'Gallery'}
        />
      )}

      {item.instagram?.InstagramEmbed && (
        <InstagramEmbed url={item.instagram.InstagramEmbed} />
      )}

      <style>{`
        .calendar-item-view {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .calendar-item-header {
          margin-bottom: 2rem;
        }
        .calendar-date {
          font-size: 1.2rem;
          color: #666;
          margin-top: 0.5rem;
        }
        .calendar-item-description {
          line-height: 1.6;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  )
}
