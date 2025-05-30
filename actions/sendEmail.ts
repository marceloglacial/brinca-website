'use server'

import { DICTIONARY } from '@/constants'

const getData = (formData: FormData) => {
  const data: { [key: string]: unknown } = {}
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith('ACTION_ID_')) {
      data[key] = value
    }
  }
  return data
}

export const sendEmail = async (formData: FormData, locale: LocalesType) => {
  const submitType = formData.get('formType')

  if (submitType === 'email') {
    const data = getData(formData)

    const response = await fetch(process.env.FORMS_URL!, {
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

export const sendCollectionCreatedEmail = async (formData: FormData) => {
  const data = getData(formData)
  // Remove no meaningful keys
  delete data.logo
  delete data.formType
  delete data.formEndpoint
  delete data.category

  const message = Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\r\n')

  await fetch(process.env.FORMS_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessKey: process.env.FORMS_API_KEY,
      subject: `Novo "${data.formTitle}" registro adicionado`,
      message,
    }),
  })
}
