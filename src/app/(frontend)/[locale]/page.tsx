import { getPayload } from 'payload'

import BlockRenderer from '@/components/BlockRenderer'
import { SetSlug } from '@/components/SlugProvider'
import config from '@/payload.config'

// The home page is managed in Payload and must reflect published edits immediately.
export const dynamic = 'force-dynamic'

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      and: [{ isHome: { equals: true } }, { status: { equals: 'published' } }],
    },
    locale: locale as any,
    depth: 2,
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    return <div className="page-view home-page-view" />
  }

  return (
    <div className="page-view home-page-view">
      <SetSlug slugs={{}} />
      {(page.components ?? []).map((block, index) => (
        <BlockRenderer key={block.id ?? index} block={block} locale={locale} />
      ))}
    </div>
  )
}
