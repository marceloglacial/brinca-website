'use server'

import { DICTIONARY } from '@/constants'

export async function sendEmail(formData: FormData, locale: LocalesType) {
  const submitType = formData.get('formType')

  if (submitType === 'email') {
    const data: { [key: string]: any } = {}
    for (const [key, value] of formData.entries()) {
      if (!key.startsWith('ACTION_ID_')) {
        data[key] = value
      }
    }

    const response = await fetch('https://api.staticforms.xyz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessKey: process.env.FORMS_API_KEY,
        subject: formData.get('formTitle'),
        ...data,
      }),
    })

    if (!response.ok) {
      return { status: 'error', message: DICTIONARY.FORM_SUCCESS[locale] }
    }

    return { status: 'success', message: DICTIONARY.FORM_ERROR[locale] }
  }

  return { status: 'error', message: DICTIONARY.FORM_INVALID[locale] }
}
