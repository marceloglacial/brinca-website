'use server'

import { DICTIONARY } from '@/constants'
import { addCollection } from '@/lib/api'
import { CollectionKey } from '@/types/new-api'

export async function addContent(formData: FormData) {
  try {
    const collectionId = formData.get('formEndpoint') as CollectionKey
    await addCollection(collectionId, formData)
    return { status: 'success' }
  } catch (error) {
    console.error('Error adding document:', error)
    const locale = formData.get('formLocale') as LocalesType
    return { status: 'error', message: DICTIONARY.FORM_SUCCESS[locale] }
  }
}
