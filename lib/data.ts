import { INVALIDATE_INTERVAL } from '@/constants'
import { getDocumentBySlug } from './firebase'
import { localizedContent } from '@/utils'
import { unstable_cache } from 'next/cache'

export const getSingleData = unstable_cache(
  async (
    collection: string,
    slug: string,
    locale: string
  ): Promise<DeprecatedApiResponse<ContentType>> => {
    try {
      const result = await getDocumentBySlug(collection, slug, locale)
      return {
        ...result,
        data: localizedContent(result.data, locale),
      }
    } catch (e) {
      console.error(e)
      throw Error
    }
  },
  ['single-event'],
  { revalidate: INVALIDATE_INTERVAL }
)
