import { INVALIDATE_INTERVAL } from '@/constants'
import { getCollectionById } from './firebase'
import { localizedData } from '@/utils'
import { unstable_cache } from 'next/cache'

export const getPageDataBySlug = unstable_cache(
  async (
    type: string,
    locale?: string,
    sortBy?: string,
    order?: OrderType,
    page?: number,
    pageSize?: number
  ): Promise<ApiResponse<unknown>> => {
    try {
      const result = await getCollectionById(type, sortBy, order, page, pageSize)
      return {
        ...result,
        data: localizedData(result.data, locale),
      }
    } catch (e) {
      console.error(e)
      throw Error
    }
  },
  ['page-data'],
  { revalidate: INVALIDATE_INTERVAL }
)
