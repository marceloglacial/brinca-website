'use server';
import { DICTIONARY } from '@/constants';
import { addDoc, collection } from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { db, storage } from '@/services/firebase';

export async function addContent(collectionId: string, formData: FormData, locale: LocalesType) {
  const data: { [key: string]: any } = {};

  for (const [key, value] of formData.entries()) {
    const keysToRemove = ['formEndpoint', 'formType', 'formLocale', 'formTitle',].includes(key)

    if (keysToRemove) continue;

    data[key] = value;
  }

  try {
    const fileField = formData.get('logo');
    if (fileField instanceof File) {
      const fileName = `${Date.now()}_${fileField.name}`;
      const storageRef = ref(storage, `partners/${fileName}`);
      await uploadBytes(storageRef, fileField);
      data.logo = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, collectionId), data);

    return {
      status: 'success'
    }
  } catch (error) {
    console.error('Error adding document:', error);
    return { status: 'error', message: DICTIONARY.FORM_SUCCESS[locale] };
  }
}
