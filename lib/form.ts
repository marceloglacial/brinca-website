'use server'
import { unstable_cache } from 'next/cache'
import { getDocumentById } from './firebase'
import { COLLECTIONS, INVALIDATE_INTERVAL } from '@/constants'

export const getSingleForm = unstable_cache(
  async (id: string): Promise<DeprecatedApiResponse<FormType>> => {
    try {
      const result = await getDocumentById(COLLECTIONS.FORMS, id)
      return {
        ...result,
        data: result.data as FormType,
      }
    } catch (e) {
      console.error(e)
      throw Error
    }
  },
  [`form-single`],
  { revalidate: INVALIDATE_INTERVAL }
)
