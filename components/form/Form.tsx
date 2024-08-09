import { FC } from 'react';
import { getDataById } from '@/services';
import { FormContainer } from './FormContainer';

export const Form: FC<FormProps> = async ({
  language,
  data,
}): Promise<JSX.Element> => {
  const allData: FormFieldsProps = await getDataById('forms', data.formId);

  return <FormContainer data={allData.data} language={language} />;
};
