import { Content, ErrorState } from '@/components'
import { SITE } from '@/constants'
import { getCollectionById } from '@/lib'
import { Heading, Section } from '@/components/ui'
import { Metadata } from 'next'
import { getSingleData } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams({ params: { slug } }: { params: { slug: string } }) {
  const pages = await getCollectionById(`${slug}`)
  return (
    pages.data?.map((page) => ({
      id: String(page.id),
    })) || []
  )
}

export async function generateMetadata(props: PageParamsType): Promise<Metadata> {
  const { slug, id, locale } = await props.params
  const response = await getSingleData(slug, id, { locale })

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST)
    return {
      title: SITE.NAME,
    }

  const page = response.data[0]

  return {
    title: `${SITE.NAME} - ${page.title}`,
  }
}

export default async function Page(props: PageParamsType) {
  const { slug, id, locale } = await props.params
  const response = await getSingleData(slug, id, { locale })

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    return <ErrorState message={response.message} />
  }

  const event = response.data[0]

  return (
    <Section>
      <div className='mb-12'>
        <Heading>
          <h1>{event.title}</h1>
        </Heading>
      </div>
      <Content items={event.blocks} locale={locale} />
    </Section>
  )
}
