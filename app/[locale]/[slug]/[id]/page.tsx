import { Content, ErrorState } from '@/components'
import { SITE } from '@/constants'
import { getCollectionById, getSingleData } from '@/lib'
import { Heading, Section } from '@/components/ui'
import { Metadata } from 'next'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams({ params: { slug } }: { params: { slug: string } }) {
  const pages = await getCollectionById(`${slug}`)
  return pages.data?.map((page) => ({
    id: String(page.id),
  })) || []
}

export async function generateMetadata(props: PageParamsType): Promise<Metadata> {
  const params = await props.params
  const result = await getSingleData(params.slug, params.id, params.locale)

  if (result.status === 'error')
    return {
      title: SITE.NAME,
    }

  const page = result.data

  return {
    title: `${SITE.NAME} - ${page.title}`,
  }
}

export default async function Page(props: PageParamsType) {
  const params = await props.params
  const result = await getSingleData(params.slug, params.id, params.locale)

  if (result.status === 'error') return <ErrorState message={result.message} />

  const event = result.data

  return (
    <Section>
      <div className='mb-12'>
        <Heading>
          <h1>{event.title}</h1>
        </Heading>
      </div>
      <Content items={event.blocks} locale={params.locale} />
    </Section>
  )
}
