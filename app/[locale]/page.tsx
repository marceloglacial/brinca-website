import { Content, ErrorState } from '@/components'
import { getCollectionById, getSinglePage } from '@/lib'
import { Section } from '@/components/ui'

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
  const result = await getSinglePage('homepage', params.locale)

  if (result.status === 'error') return <ErrorState message={result.message} />

  const content = result.data

  return (
    <Section spacing='xl'>
      <Content items={content.blocks} locale={params.locale} />
    </Section>
  )
}
