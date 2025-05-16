import { Content, ErrorState } from '@/components'
import { getCollectionById } from '@/lib'
import { Section } from '@/components/ui'
import { getPageBySlug } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'

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
  const { locale } = await props.params
  const result = await getPageBySlug('homepage', { locale })

  if (result.status >= HttpStatusSchema.enum.BAD_REQUEST && result.data) {
    return <ErrorState message={result.message} />
  }

  const content = result.data

  return (
    <Section spacing='xl'>
      <Content items={content.blocks} locale={locale} />
    </Section>
  )
}
