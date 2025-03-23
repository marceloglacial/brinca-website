type FormDataContentType = {
  title?: LocalizedString
  formId: string
}

type FormStatus = 'success' | 'error'
type FormActionTypes = 'addContent' | 'sendEmail'

interface FormFieldsProps {
  data: {
    action: {
      endpoint: string
      type: FormActionTypes
    }
    submitButton: {
      title: LocalizedString
    }
    title: LocalizedString
    fields: any[]
    status: {
      success: { message: LocalizedString }
      error: { message: LocalizedString }
    }
  }
}

interface FormProps {
  id: string
}

type FormType = {
  id: string
  show_title: boolean
  submit_type: 'email' | 'collection' | 'file_download'
  collection_id?: string
  title: string
  fields: FieldType[]
}

type FieldTypes =
  | 'text'
  | 'textarea'
  | 'select'
  | 'submit'
  | 'plain_text'
  | 'checkbox'
  | 'file_download'
type FieldType = {
  type: FieldTypes
  value: any
}

type OptionsType = {
  title: string
  value: string
  id: string
}

interface FormFieldProps {
  language: LocaleTypes
  attributes: any
}

interface FormContainerProps extends FormFieldsProps {
  data: FormType
}

interface FormTitleProps {
  title?: string
}

type FormSubmitResponse = {
  status: 'success' | 'error'
  message: string
}

type FormSubmissionType = {
  type: string
  message: string
} | null

interface FormPartnersListProps {
  pending: boolean
}
