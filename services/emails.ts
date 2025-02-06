import { sendEmail } from '@/app/actions/sendEmail';
import { DEFAULT_LOCALE, DICTIONARY } from '@/constants';

export const handleSendEmail = async (
  e: React.FormEvent<HTMLFormElement>,
  setformSubmited: React.Dispatch<React.SetStateAction<FormSubmissionType>>,
  locale: LocalesType
) => {
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
