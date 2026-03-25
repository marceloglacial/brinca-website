import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'

import { getLocalizedData, getLocalizedValue } from '@/lib/locales'
import { extractYouTubeId, getYouTubeEmbedUrl } from '@/lib/youtube'
import config from '@/payload.config'
import EventsList from '@/components/EventsList'
import CalendarList from '@/components/CalendarList'
import ActionButton from '@/components/ActionButton'
import { SetSlug } from '@/components/SlugProvider'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale: locale as any,
    limit: 1,
  })
  const page = docs[0]
  const pageTitle = page ? getLocalizedValue(page.title, locale) : 'Page'
  const title = `${pageTitle} | Brinca`
  return { title }
}

export default async function PageRoute(props: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await props.params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // First find the page to get its ID
  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
    locale: locale as any,
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    notFound()
  }

  // Fetch all localized slugs for this page
  const slugMap: Record<string, string> = {}
  const locales = ['en', 'pt-BR']

  for (const l of locales) {
    const { docs: localizedDocs } = await payload.find({
      collection: 'pages',
      where: { id: { equals: page.id } },
      locale: l as any,
      limit: 1,
    })
    if (localizedDocs[0]?.slug) {
      slugMap[l] = localizedDocs[0].slug
    }
  }

  const contentValue = getLocalizedData(page.content, locale)

  const videoId = extractYouTubeId(page.youtube?.url)
  const embedUrl = getYouTubeEmbedUrl(videoId)
  const ctaButtons = (page.cta ?? []).filter((button) => Boolean(button?.url))

  return (
    <div className="page-view">
      <SetSlug slugs={slugMap} />
      <div className="page-header">
        <h1>{getLocalizedValue(page.title, locale)}</h1>
      </div>

      <div className="page-content">
        {contentValue && typeof contentValue === 'object' && contentValue.root ? (
          <div>
            <RichText data={contentValue as any} converters={defaultJSXConverters} />
          </div>
        ) : typeof contentValue === 'string' ? (
          <div>{contentValue}</div>
        ) : null}
      </div>

      {ctaButtons.length > 0 ? (
        <div className="page-cta" style={{ margin: '2rem 0', display: 'grid', gap: '0.75rem' }}>
          {ctaButtons.map((button, index) => (
            <ActionButton
              key={`${button?.url ?? 'cta'}-${index}`}
              button={button}
              locale={locale}
            />
          ))}
        </div>
      ) : null}

      {embedUrl ? (
        <div className="page-video">
          <iframe
            width="100%"
            height="480"
            src={embedUrl}
            title={getLocalizedValue(page.title, locale)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}

      {page.lists?.showEvents && <EventsList locale={locale} />}
      {page.lists?.showCalendars && <CalendarList locale={locale} />}
    </div>
  )
}
