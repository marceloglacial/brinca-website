import { getSingleForm } from '@/lib'
import { FC } from 'react'
import { Alert } from '../alert/Alert'
import { FormContainer } from './FormContainer'

export const Form: FC<FormProps> = async ({ id }) => {
  const result = await getSingleForm(id)

  if (result.status === 'error') return <Alert message={result.message} />

  return <FormContainer data={result.data} />
}
