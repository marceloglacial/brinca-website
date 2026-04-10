import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'

import { getLocalizedValue } from '@/lib/locales'
import config from '@/payload.config'
import { formatDate } from '@/lib/formatDate'
import { SetSlug } from '@/components/SlugProvider'
import CloudinaryGallery from '@/components/CloudinaryGallery'
import InstagramEmbed from '@/components/InstagramEmbed'
import ActionButton from '@/components/ActionButton'
import { LOCALE_CODES } from '@/constants/locales'
import type { Event } from '@/payload-types'

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

function renderEventBlocks(event: Event, locale: string) {
  if (!event.components || !Array.isArray(event.components)) {
    return null
  }

  return (
    <>
      {event.components.map((block, index) => {
        if (block?.blockType === 'richTextBlock' && 'content' in block) {
          return (
            <div key={index} className="event-description">
              <RichText data={block.content as any} converters={defaultJSXConverters} />
            </div>
          )
        }

        if (block?.blockType === 'galleryBlock' && 'cloudinaryFolder' in block) {
          return (
            <CloudinaryGallery
              key={index}
              folderPath={block.cloudinaryFolder as string}
              title={locale === 'pt-BR' ? 'Galeria' : 'Gallery'}
            />
          )
        }

        if (block?.blockType === 'instagramBlock' && 'url' in block) {
          return <InstagramEmbed key={index} url={block.url as string} />
        }

        if (block?.blockType === 'ctaBlock' && 'buttons' in block && Array.isArray(block.buttons)) {
          const buttons = block.buttons.filter((button: any) => {
            if (button?.linkType === 'external') return Boolean(button?.url)
            if (button?.linkType === 'internal') return Boolean(button?.internalLink)
            return false
          })
          return buttons.length > 0 ? (
            <div key={index} style={{ marginTop: 12, display: 'grid', gap: '0.75rem' }}>
              {buttons.map((button: any, btnIndex: number) => (
                <ActionButton
                  key={`${button?.url ?? button?.internalLink ?? 'cta'}-${btnIndex}`}
                  button={button}
                  locale={locale}
                />
              ))}
            </div>
          ) : null
        }

        return null
      })}
    </>
  )
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

  return (
    <div className="event-view">
      <SetSlug slugs={slugMap} />

      <div className="event-grid">
        <main className="event-main">
          <div className="event-header">
            <h1>{getLocalizedValue(event.title, locale)}</h1>
            <p className="event-date">
              {formatDate(event.date, locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          {renderEventBlocks(event, locale)}
        </main>

        <aside className="event-sidebar">
          {event.thumbnail ? (
            <>
              <img
                src={event.thumbnail}
                alt={getLocalizedValue(event.title, locale)}
                style={{ width: '100%', borderRadius: 6 }}
              />
            </>
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
