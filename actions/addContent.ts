'use server'
import { DICTIONARY } from '@/constants'
import { db, storage } from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export async function addContent(collectionId: string, formData: FormData, locale: LocalesType) {
  const data: { [key: string]: any } = {}

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
      data[baseKey][lang] = data[key]
      delete data[key]
    }
  })

  try {
    const fileField = formData.get('logo')
    if (fileField instanceof File) {
      const fileName = `${Date.now()}_${fileField.name}`
      const storageRef = ref(storage, `partners/${fileName}`)
      await uploadBytes(storageRef, fileField)
      data.logo = await getDownloadURL(storageRef)
    }
    await addDoc(collection(db, collectionId), data)

    return {
      status: 'success',
    }
  } catch (error) {
    console.error('Error adding document:', error)
    return { status: 'error', message: DICTIONARY.FORM_SUCCESS[locale] }
  }
}
