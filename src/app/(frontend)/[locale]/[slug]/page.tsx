import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { getLocalizedValue, renderLexical } from '@/lib/lexical'
import config from '@/payload.config'

export default async function PageRoute(props: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await props.params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

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

  const contentValue =
    typeof page.content === 'object' && page.content !== null
      ? locale in (page.content as Record<string, any>)
        ? (page.content as Record<string, any>)[locale]
        : page.content
      : page.content

  return (
    <div className="page-view">
      <div className="page-header">
        <a href={`/${locale}`}>← Back</a>
        <h1>{getLocalizedValue(page.title, locale)}</h1>
      </div>
      <div className="page-content">
        {contentValue && typeof contentValue === 'object' && contentValue.root ? (
          <div>{renderLexical(contentValue.root.children)}</div>
        ) : contentValue ? (
          <div>{contentValue}</div>
        ) : (
          <p>No content available</p>
        )}
      </div>
    </div>
  )
}
