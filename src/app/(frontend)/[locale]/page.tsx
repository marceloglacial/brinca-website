import { getPayload } from 'payload'

import BlockRenderer from '@/components/BlockRenderer'
import config from '@/payload.config'

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { isHome: { equals: true } },
    locale: locale as any,
    depth: 2,
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    return <div className="page-view" />
  }

  return (
    <div className="page-view">
      {(page.components ?? []).map((block, index) => (
        <BlockRenderer key={block.id ?? index} block={block} locale={locale} />
      ))}
    </div>
  )
}
