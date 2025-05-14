import { COLLECTIONS } from '@/constants'
import { getCollection } from './api'

export const getEvents = async () => {
  try {
    const result = await getCollection(COLLECTIONS.EVENTS)
    return {
      ...result,
      data: result.data as unknown as EventType[],
    }
  } catch (e) {
    console.error(e)
    throw Error
  }
}
