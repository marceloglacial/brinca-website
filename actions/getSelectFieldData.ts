'use server'

import { getCategories } from '@/services'

export const getSelectFieldData = async () => {
  return await getCategories();
}
