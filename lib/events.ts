import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants'
import { getCollectionById } from './firebase'
import { unstable_cache } from 'next/cache'

export const getEvents = unstable_cache(
  async (): Promise<ApiResponse<EventType[]>> => {
    try {
      const result = await getCollectionById(COLLECTIONS.EVENTS)
      return {
        ...result,
        data: result.data,
      }
    } catch (e) {
      console.error(e)
      throw Error
    }
  },
  ['event-by-slug'],
  { revalidate: INVALIDATE_INTERVAL }
)
