import { Content, ErrorState } from '@/components'
import { SITE } from '@/constants'
import { Heading, Section } from '@/components/ui'
import { Metadata } from 'next'
import { getCollection, getCollectionById } from '@/lib/api'
import { CollectionKey } from '@/types'
import { PageParamsType } from '@/types/page'
import { HttpStatusSchema } from '@/schemas/api'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams({
  params: { slug },
}: {
  params: { slug: CollectionKey }
}) {
  const pages = await getCollection(slug, {})
  return (
    pages.data?.map((page) => ({
      id: String(page.id),
    })) || []
  )
}

export async function generateMetadata(props: PageParamsType): Promise<Metadata> {
  const { slug, id, locale } = await props.params
  const result = await getCollectionById(slug, id, { locale })

  if (result.status >= HttpStatusSchema.enum.BAD_REQUEST)
    return {
      title: SITE.NAME,
    }

  const page = result.data?.[0]

  return {
    title: `${SITE.NAME} - ${page?.title}`,
  }
}

export default async function Page(props: PageParamsType) {
  const { slug, id, locale } = await props.params
  const result = await getCollectionById(slug, id, { locale })

  if (result.status >= HttpStatusSchema.enum.BAD_REQUEST)
    return <ErrorState message={result.message} />

  const event = result.data?.[0]

  return (
    <Section>
      <div className='mb-12'>
        <Heading>
          <h1>{event?.title}</h1>
        </Heading>
      </div>
      <Content items={event?.blocks} locale={locale} />
    </Section>
  )
}
