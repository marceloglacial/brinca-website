'use server'

import { getCategories } from '@/lib'

export const getSelectFieldData = async () => {
  return await getCategories()
}
