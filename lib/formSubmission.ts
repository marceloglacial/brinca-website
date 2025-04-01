import { addContent, sendCollectionCreatedEmail, sendEmail } from '@/actions'
import { DEFAULT_LOCALE, DICTIONARY } from '@/constants'

export const handleFormSubmission = async (
  e: React.FormEvent<HTMLFormElement>,
  setFormSubmitted: React.Dispatch<React.SetStateAction<FormSubmissionType>>
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
        if (res.status === 'success') {
          await sendCollectionCreatedEmail(formData)
        }
        break
      default:
        throw new Error(`Unsupported form submission type: ${submissionType}`)
    }
    setFormSubmitted({
      type: res.status,
      message: DICTIONARY.FORM_SUCCESS[locale],
    })
  } catch (error) {
    console.error(error)
    setFormSubmitted({
      type: 'error',
      message: DICTIONARY.FORM_ERROR[locale],
    })
  }
}
