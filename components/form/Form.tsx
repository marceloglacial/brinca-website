import { FC } from 'react'
import { Alert } from '../alert/Alert'
import { FormContainer } from './FormContainer'
import { getCollectionById } from '@/lib/api'
import { COLLECTIONS } from '@/constants'
import { HttpStatusSchema } from '@/schemas/api'

export const Form: FC<FormProps> = async ({ id, locale }) => {
  const response = await getCollectionById(COLLECTIONS.FORMS, id, { locale })

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    return <Alert message={response.message} />
  }

  const data = response.data[0] as FormType

  return <FormContainer data={data} />
}
