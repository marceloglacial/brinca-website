import { Content, ErrorState } from '@/components'
import { SITE } from '@/constants'
import { Heading, Section } from '@/components/ui'
import { Metadata } from 'next'
import { getAllPages, getPageBySlug } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'
import { PageParamsType } from '@/types/page'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const pages = await getAllPages({})
  return pages.data?.map((page) => ({
    id: String(page.id),
    slug: String(page.slug),
  }))
}

export async function generateMetadata(props: PageParamsType): Promise<Metadata> {
  const { slug, locale } = await props.params
  const result = await getPageBySlug(slug, { locale })

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
  const { slug, locale } = await props.params
  const result = await getPageBySlug(slug, { locale })

  if (result.status >= HttpStatusSchema.enum.BAD_REQUEST)
    return <ErrorState message={result.message} />

  const content = result.data?.[0]

  return (
    <Section>
      <div className='mb-12'>
        <Heading>
          <h1>{content?.title}</h1>
        </Heading>
      </div>
      <Content items={content?.blocks} locale={locale} />
    </Section>
  )
}
