import { addContent, sendEmail } from '@/actions'
import { DEFAULT_LOCALE, DICTIONARY } from '@/constants'

export const handleFormSubmission = async (
  e: React.FormEvent<HTMLFormElement>,
  setformSubmited: React.Dispatch<React.SetStateAction<FormSubmissionType>>
) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const submissionType = formData.get('formType') as string
  const collectionId = formData.get('formEndpoint') as string
  const locale = formData.get('formLocale') as LocalesType

  try {
    let res
    switch (submissionType) {
      case 'email':
        res = await sendEmail(formData, locale || DEFAULT_LOCALE)
        break
      case 'collection':
        res = await addContent(collectionId, formData, locale || DEFAULT_LOCALE)
        break
      default:
        throw new Error(`Unsupported form submission type: ${submissionType}`)
    }
    setformSubmited({
      type: res.status,
      message: DICTIONARY.FORM_SUCCESS[locale],
    })
  } catch (error) {
    console.error(error)
    setformSubmited({
      type: 'error',
      message: DICTIONARY.FORM_ERROR[locale],
    })
  }
}
