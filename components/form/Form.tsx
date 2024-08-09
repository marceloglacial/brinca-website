import { FC } from 'react';
import { getDataById } from '@/services';
import { Heading } from '@marceloglacial/brinca-ui';
import { FormContainer } from './FormContainer';

export const Form: FC<FormProps> = async ({
  language,
  data,
}): Promise<JSX.Element> => {
  const allData: FormFieldsProps = await getDataById('forms', data.formId);
  const formData = allData.data;

  return (
    <div className='form'>
      {formData.title && (
        <Heading>
          <h2>{formData.title[language]}</h2>
        </Heading>
      )}
      <FormContainer data={formData} language={language} />
    </div>
  );
};
