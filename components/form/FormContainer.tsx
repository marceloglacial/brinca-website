'use client';
import { FC } from 'react';
import { formServerAction } from '@/actions';
import { FormField } from './FormField';
import { useFormState } from 'react-dom';
import { Form } from '@marceloglacial/brinca-ui';
import { FormTitle } from './FormTitle';
import { Motion } from '../motion/Motion';

export const FormContainer: FC<FormContainerProps> = (props): JSX.Element => {
  const form = props.data;

  const [state, formAction] = useFormState(formServerAction, null);

  if (state) {
    const textColor = state.status === 'error' ? 'text-red-600 font-bold' : '';

    return (
      <div className='form-feedback'>
        {form.showTitle && <FormTitle title={form.title} />}
        <article className={`p-8 text-center ${textColor}`}>
          <p
            dangerouslySetInnerHTML={{
              __html: form.status[state.status as FormStatus].message,
            }}
          />
        </article>
      </div>
    );
  }

  return (
    <Form action={formAction}>
      {form.showTitle && <FormTitle title={form.title} />}
      <input type='hidden' name='formTitle' value={form.title} />
      <input type='hidden' name='formType' value={form.type} />
      <input type='hidden' name='formEndpoint' value={form.endpoint} />
      <input type='text' name='full_name' className='hidden' tabIndex={-1} />

      {form.fields.map((field: any, index: number) => (
        <Motion key={index}>
          <FormField {...field} />
        </Motion>
      ))}
    </Form>
  );
};
