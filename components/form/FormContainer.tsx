'use client';
import { FC, useState } from 'react';
import { FormField, FormTitle } from '@/components';
import { useParams } from 'next/navigation';
import { localizedContent } from '@/utils';
import { DICTIONARY } from '@/constants';
import { handleSendEmail } from '@/services';
import { Section } from '@marceloglacial/brinca-ui';

export const FormContainer: FC<FormContainerProps> = (props): JSX.Element => {
  const params = useParams();
  const [formSubmited, setformSubmited] = useState<FormSubmissionType>(null);

  const locale = params.locale as LocalesType;
  const form = localizedContent(props.data, locale) as FormType;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (form.submit_type === 'email') {
      await handleSendEmail(e, setformSubmited, locale);
    } else {
      return alert('Not email');
    }
  };

  if (formSubmited) {
    return (
      <div className='mt-16 text-center'>
        <Section spacing='s'>
          <h4>{DICTIONARY.FORM_SUCCESS[locale]}</h4>
          <p>{DICTIONARY.FORM_RESPONSE[locale]}</p>
        </Section>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {form.show_title && <FormTitle>{form.title}</FormTitle>}
        <input type='hidden' name='formTitle' value={form.title} />
        <input type='hidden' name='formType' value={form.submit_type} />
        <input type='hidden' name='formEndpoint' value={'pages'} />
        <div className='max-w-screen-md mx-auto grid grid-cols-1 gap-4'>
          {form.fields.map((field, index) => (
            <FormField key={index} {...field} />
          ))}
        </div>
      </form>
    </>
  );
};
