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
  const eventTitle = event ? getLocalizedValue(event.title, locale) : 'Event'
  const title = `${eventTitle} | Brinca`
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

  const descriptionValue =
    typeof event.description === 'object' && event.description !== null
      ? locale in (event.description as Record<string, any>)
        ? (event.description as Record<string, any>)[locale]
        : event.description
      : event.description


  return (
    <div className="event-view">
      <SetSlug slugs={slugMap} />

      <div className="event-grid">
        <main className="event-main">
          <div className="event-header">
            <h1>{getLocalizedValue(event.title, locale)}</h1>
            <p className="event-date">{formatDate(event.date, locale, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}</p>
          </div>

          <div className="event-description">
            {descriptionValue && typeof descriptionValue === 'object' && (descriptionValue as any).root ? (
              <div>{renderLexical((descriptionValue as any).root.children)}</div>
            ) : descriptionValue ? (
              <div>{descriptionValue as any}</div>
            ) : null}
          </div>

          {event.gallery?.cloudinaryFolder && (
            <CloudinaryGallery 
              folderPath={event.gallery.cloudinaryFolder} 
              title={locale === 'pt-BR' ? 'Galeria' : 'Gallery'}
            />
          )}

          {event.instagram?.InstagramEmbed && (
            <InstagramEmbed url={event.instagram.InstagramEmbed} />
          )}
        </main>

        <aside className="event-sidebar">
          {event.thumbnail ? (
            <img src={event.thumbnail} alt={getLocalizedValue(event.title, locale)} style={{ width: '100%', borderRadius: 6 }} />
          ) : null}
        </aside>
      </div>

      <style>{`
        .event-view {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .event-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 2rem;
        }
        .event-header {
          margin-bottom: 2rem;
        }
        .event-date {
          font-size: 1.2rem;
          color: #666;
          margin-top: 0.5rem;
        }
        .event-description {
          line-height: 1.6;
          font-size: 1.1rem;
        }
        .event-sidebar img { max-width: 100%; height: auto; display: block; }
      `}</style>
    </div>
  )
}
