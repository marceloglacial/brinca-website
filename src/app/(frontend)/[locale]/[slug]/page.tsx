import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { getLocalizedValue, renderLexical } from '@/lib/lexical'
import { extractYouTubeId, getYouTubeEmbedUrl } from '@/lib/youtube'
import config from '@/payload.config'
import EventsList from '@/components/EventsList'
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

  const contentValue =
    typeof page.content === 'object' && page.content !== null
      ? locale in (page.content as Record<string, any>)
        ? (page.content as Record<string, any>)[locale]
        : page.content
      : page.content

  const videoId = extractYouTubeId(page.youtube?.url)
  const embedUrl = getYouTubeEmbedUrl(videoId)

  return (
    <div className="page-view">
      <SetSlug slugs={slugMap} />
      <div className="page-header">
        <h1>{getLocalizedValue(page.title, locale)}</h1>
      </div>

      <div className="page-content">
        {contentValue && typeof contentValue === 'object' && contentValue.root ? (
          <div>{renderLexical(contentValue.root.children)}</div>
        ) : contentValue ? (
          <div>{contentValue}</div>
        ) : null}
      </div>

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

      {page.events?.showEvents && <EventsList locale={locale} />}
    </div>
  )
}
