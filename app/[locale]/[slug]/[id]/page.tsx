import { Content, ErrorState } from '@/components'
import { SITE } from '@/constants'
import { Heading, Section } from '@/components/ui'
import { Metadata } from 'next'
import { getAllByCollection, getCollectionBySlug } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'
import { PageParamsType } from '@/types/page'
import { CollectionKey } from '@/types/new-api'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams({
  params: { slug: collection },
}: {
  params: { slug: CollectionKey }
}) {
  if (!collection) return []
  const response = await getAllByCollection(collection, {})
  return response.data.map((page) => ({
    id: String(page.id),
  }))
}

export async function generateMetadata(props: PageParamsType): Promise<Metadata> {
  const { slug: collection, id: slug, locale } = await props.params
  const response = await getCollectionBySlug(collection, slug, { locale })
  const content = response.data[0]

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST || !content) {
    return {
      title: SITE.NAME,
    }
  }

  return {
    title: `${SITE.NAME} - ${content.title}`,
  }
}

export default async function Page(props: PageParamsType) {
  const { slug: collection, id: slug, locale } = await props.params
  const response = await getCollectionBySlug(collection, slug, { locale })
  const content = response.data[0]

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST || !content) {
    return <ErrorState message={response.message} />
  }

  return (
    <Section>
      <div className='mb-12'>
        <Heading>
          <h1>{content.title}</h1>
        </Heading>
      </div>
      <Content items={content.blocks} locale={locale} />
    </Section>
  )
}
