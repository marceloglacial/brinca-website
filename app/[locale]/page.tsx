import { Content, ErrorState } from '@/components'
import { Section } from '@/components/ui'
import { COLLECTIONS } from '@/constants'
import { getLocales, getPageBySlug } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const locales = await getLocales()
  return locales.map((locale) => ({
    id: String(locale.id),
  }))
}

export default async function Page(props: PageParamsType) {
  const { locale } = await props.params
  const response = await getPageBySlug(COLLECTIONS.PAGES, 'homepage', { locale })
  const content = response.data[0]

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST || !content) {
    return <ErrorState message={response.message} />
  }

  return (
    <Section spacing='xl'>
      <Content items={content.blocks} locale={locale} />
    </Section>
  )
}
