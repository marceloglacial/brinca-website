import { Content, ErrorState } from '@/components'
import { Section } from '@/components/ui'
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
