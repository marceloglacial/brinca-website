import { Content, ErrorState } from '@/components'
import { COLLECTIONS, SITE } from '@/constants'
import { Heading, Section } from '@/components/ui'
import { Metadata } from 'next'
import { getAllPages, getPageBySlug } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const pages = await getAllPages()
  return pages.data.map((page) => ({
    id: String(page.id),
    slug: String(page.slug),
  }))
}

export async function generateMetadata(props: PageParamsType): Promise<Metadata> {
  const { slug, locale } = await props.params
  const response = await getPageBySlug(COLLECTIONS.PAGES, slug, { locale })
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
  const { slug, locale } = await props.params
  const response = await getPageBySlug(COLLECTIONS.PAGES, slug, { locale })
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
