import { FC } from 'react';
import { getContentById } from '@/services';
import { FormContainer } from './FormContainer';
import { normalizeFormsData } from '@/utils';
import { ErrorState } from '../error-state/ErrorState';
import { COLLECTIONS } from '@/constants';

export const Form: FC<FormProps> = async (props): Promise<JSX.Element> => {
  const response = await getContentById(
    COLLECTIONS.FORMS,
    props.data.formId,
    props.locale
  );

  if ('error' in response) return <ErrorState data={response} />;

  const data = {
    ...normalizeFormsData(response),
    showTitle: props.data.showTitle,
  };

  return <FormContainer data={data} />;
};
