'use server'

import { DICTIONARY } from '@/constants'
import { addCollection } from '@/lib/api'
import { CollectionKey } from '@/types/new-api'
import { fileToBase64 } from '@/utils/helpers'

export async function addContent(
  collectionId: CollectionKey,
  formData: FormData,
  locale: LocalesType
) {
  const data: Record<string, unknown> = {}

  for (const [key, value] of formData.entries()) {
    const keysToRemove = ['formEndpoint', 'formType', 'formLocale', 'formTitle'].includes(key)
    if (keysToRemove) continue
    data[key] = value
  }

  Object.keys(data).forEach((key) => {
    const match = key.match(/^(.*)_(en|pt_br)$/)
    if (match && match[1]) {
      const baseKey = match[1]
      const lang = match[2] || ''
      if (typeof data[baseKey] !== 'object' || !data[baseKey]) {
        data[baseKey] = {}
      }
      ;(data[baseKey] as Record<string, unknown>)[lang] = data[key]
      delete data[key]
    }
  })

  try {
    const fileField = formData.get('logo')
    if (fileField instanceof File) {
      const fileName = `${Date.now()}_${fileField.name}`
      const file = new File([fileField], fileName, {
        type: fileField.type,
        lastModified: fileField.lastModified,
      })
      data.logo = await fileToBase64(file)
    }
    await addCollection(collectionId, data)

    return {
      status: 'success',
    }
  } catch (error) {
    console.error('Error adding document:', error)
    return { status: 'error', message: DICTIONARY.FORM_SUCCESS[locale] }
  }
}
