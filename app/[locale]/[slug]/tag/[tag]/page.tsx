import { PartnersList } from '@/components'
import { COLLECTIONS, SITE } from '@/constants'
import { getDocumentBySlug } from '@/lib'
import { localizedContent } from '@/utils'
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
  const params = await props.params

  if (!params.tag) return <>Error loading page</>

  const result = await getDocumentBySlug(COLLECTIONS.CATEGORIES, params.tag, params.locale)

  const category = localizedContent(result, params.locale)

  return (
    <>
      <div className='mb-12'>
        <Heading>
          <h1 className='first-letter:uppercase'>{category.data.title}</h1>
        </Heading>
      </div>
      <PartnersList category={category.data} locale={params.locale} />
    </>
  )
}
export default PartnersPage
