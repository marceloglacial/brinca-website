import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants'
import { getCollectionById } from './firebase'
import { localizedData } from '@/utils'
import { unstable_cache } from 'next/cache'

export const getMenus = unstable_cache(
  async (locale: string): Promise<ApiResponse<MenusType>> => {
    try {
      const result = await getCollectionById(COLLECTIONS.MENUS)
      return {
        ...result,
        data: localizedData(result.data, locale),
      }
    } catch (e) {
      console.error(e)
      throw Error
    }
  },
  ['menus'],
  { revalidate: INVALIDATE_INTERVAL }
)
