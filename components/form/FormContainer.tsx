'use client';
import { FC } from 'react';
import { formServerAction } from '@/actions';
import { FormField } from './FormField';
import { FormSubmitButton } from './FormSubmitButton';
import { useFormState } from 'react-dom';
import { Form } from '@marceloglacial/brinca-ui';
import { FormTitle } from './FormTitle';

export const FormContainer: FC<FormContainerProps> = (props): JSX.Element => {
  const { data, language } = props;
  const { fields, action, submitButton, status, title } = data;
  const [state, formAction] = useFormState(formServerAction, null);

  if (state) {
    const textColor = state.status === 'error' ? 'text-red-600 font-bold' : '';
    return (
      <div className='form-feedback'>
        <FormTitle title={title} language={language} />
        <div className={`p-8 text-center ${textColor}`}>
          {status[state.status as FormStatus].message[language]}
        </div>
      </div>
    );
  }

  return (
    <Form action={formAction}>
      <FormTitle title={title} language={language} />
      <input type='hidden' name='formTitle' value={title[language]} />
      <input type='hidden' name='formType' value={action.type} />
      <input type='hidden' name='formEndpoint' value={action.endpoint} />
      <input type='text' name='full_name' className='hidden' tabIndex={-1} />

      {fields.map((field: any) => (
        <FormField key={field.id} language={language} attributes={field} />
      ))}
      <FormSubmitButton value={submitButton.title[language]} />
    </Form>
  );
};
