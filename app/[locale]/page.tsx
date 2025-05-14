import { Content, ErrorState } from '@/components'
import { getCollectionById } from '@/lib'
import { Section } from '@/components/ui'
import { HttpStatusSchema } from '@/schemas/api'
import { getPageBySlug } from '@/lib/api'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const pages = await getCollectionById('locales')
  return (
    pages.data?.map((page) => ({
      id: String(page.id),
    })) || []
  )
}

export default async function Page(props: PageParamsType) {
  const params = await props.params
  const result = await getPageBySlug('homepage', params)

  if (result.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    return <ErrorState message={result.message} />
  }

  const content = result.data?.[0]

  return (
    <Section spacing='xl'>
      <Content items={content?.blocks} locale={params.locale} />
    </Section>
  )
}
