import { getDataById } from '@/services';
import { Heading } from '@marceloglacial/brinca-ui';
import { FC } from 'react';
import { FormField } from './FormField';

export const Form: FC<FormProps> = async ({
  language,
  data,
}): Promise<JSX.Element> => {
  const allData: FormFieldsProps = await getDataById('forms', data.formId);
  const formFields = allData.data.fields;

  return (
    <div className='form max-w-4xl mx-auto'>
      {data.title && (
        <Heading>
          <h2>{data.title[language]}</h2>
        </Heading>
      )}
      <form className='grid gap-8'>
        {formFields.map((field) => (
          <FormField key={field.id} language={language} attributes={field} />
        ))}
      </form>
    </div>
  );
};
