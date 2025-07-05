import { FC } from 'react'
import { Alert } from '../alert/Alert'
import { FormContainer } from './FormContainer'
import { getCollectionById } from '@/lib/api'
import { COLLECTIONS } from '@/constants'
import { HttpStatusSchema } from '@/schemas/api'
import { custom } from '@/utils/helpers'

export const Form: FC<FormProps> = async ({ id }) => {
  const response = await getCollectionById(COLLECTIONS.FORMS, id, {})

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    return <Alert message={response.message} />
  }

  const data = response.data[0] as FormType

  custom.log({ data })

  return <FormContainer data={data} />
}
