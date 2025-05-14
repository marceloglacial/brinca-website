import { COLLECTIONS } from '@/constants'
import { localizedData } from '@/utils'
import { getCollection } from './api'
import { GetDataParams } from '@/types'

export const getMenus = async (locale: GetDataParams['locale']) => {
  try {
    const result = await getCollection(COLLECTIONS.MENUS, { locale })
    return {
      ...result,
      data: localizedData(result.data, locale),
    }
  } catch (e) {
    console.error(e)
    throw Error
  }
}
