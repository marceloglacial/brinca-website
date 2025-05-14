import { PartnersList } from '@/components'
import { COLLECTIONS, SITE } from '@/constants'
import { getDocumentBySlug } from '@/lib'
import { localizedContent } from '@/utils'
import { Heading } from '@/components/ui'
import { Metadata } from 'next'
import { getCollection } from '@/lib/api'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const pages = await getCollection('partners')
  return (pages.data ?? []).map((page) => ({
    id: String(page.id),
  }))
}

export async function generateMetadata(props: PageParamsType): Promise<Metadata> {
  const params = await props.params
  const result = await getDocumentBySlug(COLLECTIONS.CATEGORIES, params.tag, params.locale)

  if (result.status === 'error')
    return {
      title: SITE.NAME,
    }

  const page = localizedContent(result.data)

  return {
    title: `${SITE.NAME} - ${page.title}`,
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
      <PartnersList category={category.data} />
    </>
  )
}
export default PartnersPage
