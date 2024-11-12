import { FC } from 'react';
import { getSingleForm } from '@/services';
import { FormContainer } from './FormContainer';
import { Alert } from '../alert/Alert';

export const Form: FC<FormProps> = async ({ id }): Promise<JSX.Element> => {
  const result = await getSingleForm(id);

  if (result.status === 'error') return <Alert message={result.message} />;

  return <FormContainer data={result.data} />;
};
