'use client';
import { FC } from 'react';
import { FormField } from './FormField';
import { Form } from '@marceloglacial/brinca-ui';
import { FormTitle } from './FormTitle';
import { useParams } from 'next/navigation';
import { localizedContent } from '@/utils';

export const FormContainer: FC<FormContainerProps> = (props): JSX.Element => {
  const params = useParams();
  const form = localizedContent(
    props.data,
    params.locale as string
  ) as FormType;

  return (
    <Form action={() => alert('test')}>
      {form.show_title && <FormTitle>{form.title}</FormTitle>}
      <input type='hidden' name='formTitle' value={form.title} />
      <input type='hidden' name='formType' value={form.submit_type} />
      <input type='hidden' name='formEndpoint' value={'pages'} />
      {form.fields.map((field, index) => (
        <FormField key={index} {...field} />
      ))}
    </Form>
  );
};
