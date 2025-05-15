import { Content, ErrorState } from '@/components'
import { Section } from '@/components/ui'
import { HttpStatusSchema } from '@/schemas/api'
import { getCollection, getPageBySlug } from '@/lib/api'
import { COLLECTIONS } from '@/constants'
import { PageParamsType } from '@/types/page'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const pages = await getCollection(COLLECTIONS.LOCALES, {})
  return (
    pages.data?.map((page) => ({
      id: String(page.id),
    })) || []
  )
}

export default async function Page(props: PageParamsType) {
  const { locale } = await props.params
  const result = await getPageBySlug('homepage', { locale })

  if (result.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    return <ErrorState message={result.message} />
  }

  const content = result.data?.[0]

  return (
    <Section spacing='xl'>
      <Content items={content?.blocks} locale={locale} />
    </Section>
  )
}
