'use client';
import { FC, useEffect, useState } from 'react';
import { FormField } from './FormField';
import { FormTitle } from './FormTitle';
import { useParams } from 'next/navigation';
import { localizedContent } from '@/utils';
import { sendEmail } from '@/app/actions/sendEmail';
import { Toaster, toast } from 'sonner';
import { DEFAULT_LOCALE, DICTIONARY } from '@/constants';

export const FormContainer: FC<FormContainerProps> = (props): JSX.Element => {
  const params = useParams();
  const locale = params.locale as LocalesType;
  const form = localizedContent(props.data, locale) as FormType;

  const [formSubmited, setformSubmited] = useState<FormSubmissionType>(null);

  useEffect(() => {
    formSubmited && toast.success(formSubmited.message);
  }, [formSubmited]);

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const res = await sendEmail(formData, locale || DEFAULT_LOCALE);
      setformSubmited({
        type: res.status,
        message: DICTIONARY.FORM_SUCCESS[locale],
      });
    } catch (error) {
      setformSubmited({
        type: 'error',
        message: DICTIONARY.FORM_ERROR[locale],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (form.submit_type === 'email') {
      await handleSendEmail(e);
    } else {
      return alert('Not email');
    }
  };

  return (
    <>
      <Toaster richColors position='bottom-center' />
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
