import { Content, ErrorState } from '@/components'
import { SITE } from '@/constants'
import { getSinglePage } from '@/lib'
import { Heading, Section } from '@/components/ui'
import { Metadata } from 'next'
import { getAllPages } from '@/lib/api'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const pages = await getAllPages()
  return (
    pages.data?.map((page) => ({
      id: String(page.id),
      slug: String(page.slug),
    })) ?? []
  )
}

export async function generateMetadata(props: PageParamsType): Promise<Metadata> {
  const params = await props.params
  const result = await getSinglePage(params.slug, params.locale)

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
  const result = await getSinglePage(params.slug, params.locale)

  if (result.status === 'error') return <ErrorState message={result.message} />

  const content = result.data

  return (
    <Section>
      <div className='mb-12'>
        <Heading>
          <h1>{content.title}</h1>
        </Heading>
      </div>
      <Content items={content.blocks} locale={params.locale} />
    </Section>
  )
}
