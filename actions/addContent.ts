'use server'

import { DICTIONARY } from '@/constants'
import { addCollection } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'
import { CollectionKey } from '@/types/new-api'

export async function addContent(formData: FormData) {
  const locale = formData.get('formLocale') as LocalesType
  try {
    const collectionId = formData.get('formEndpoint') as CollectionKey
    const response = await addCollection(collectionId, formData)
    if (response.status === HttpStatusSchema.enum.CREATED) {
      return { status: 'success' }
    } else {
      return { status: 'error', message: DICTIONARY.FORM_ERROR[locale] }
    }
  } catch (error) {
    console.error('Error adding document:', error)
    return { status: 'error', message: DICTIONARY.FORM_ERROR[locale] }
  }
}
