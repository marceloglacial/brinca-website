'use server';

import { DICTIONARY } from '@/constants';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '@/services/firebase';

export async function addContent(collectionId: string, formData: FormData, locale: LocalesType) {
  const data: { [key: string]: any } = {};

  for (const [key, value] of formData.entries()) {
    const keysToRemove = ['formEndpoint', 'formType', 'formLocale', 'formTitle'].includes(key)

    if (keysToRemove) continue;

    data[key] = value;
  }

  try {
    await addDoc(collection(db, collectionId), data);
    return {
      status: 'success'
    }
  } catch (error) {
    console.error('Error adding document:', error);
    return { status: 'error', message: DICTIONARY.FORM_SUCCESS[locale] };
  }
}
