import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import BlockRenderer from '@/components/BlockRenderer'
import { SetSlug } from '@/components/SlugProvider'
import { getLocalizedValue } from '@/lib/locales'
import config from '@/payload.config'

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

  return {
    title: `${pageTitle} | Brinca`,
  }
}

export default async function PageRoute(props: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await props.params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale: locale as any,
    depth: 2,
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    notFound()
  }

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

  return (
    <div className="page-view">
      <SetSlug slugs={slugMap} />

      {(page.components ?? []).map((block, index) => (
        <BlockRenderer key={block.id ?? index} block={block} locale={locale} />
      ))}
    </div>
  )
}
