import { PartnersList } from '@/components'
import { COLLECTIONS, SITE } from '@/constants'
import { Heading } from '@/components/ui'
import { Metadata } from 'next'
import { PageParamsType } from '@/types/page'
import { getAllByCollection, getCollectionBySlug } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const response = await getAllByCollection(COLLECTIONS.PARTNERS, {})
  return response.data.map((partner) => ({
    id: String(partner.id),
  }))
}

export async function generateMetadata(props: PageParamsType): Promise<Metadata> {
  const { tag: slug, locale } = await props.params
  const response = await getCollectionBySlug(COLLECTIONS.CATEGORIES, slug, { locale })
  const content = response.data[0]

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST)
    return {
      title: SITE.NAME,
    }

  return {
    title: `${SITE.NAME} - ${content.title}`,
  }
}

const PartnersPage = async (props: PageParamsType) => {
  const { tag: slug, locale } = await props.params

  if (!slug) return <>Error loading page</>

  const response = await getCollectionBySlug(COLLECTIONS.CATEGORIES, slug, { locale })
  const category = response.data[0] as CategoryType

  return (
    <>
      <div className='mb-12'>
        <Heading>
          <h1 className='first-letter:uppercase'>{category.title}</h1>
        </Heading>
      </div>
      <PartnersList category={category} locale={locale} />
    </>
  )
}
export default PartnersPage
