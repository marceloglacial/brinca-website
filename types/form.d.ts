type FormDataContentType = {
    showTitle?: boolean,
    formId: string
}

type FormStatus = 'success' | 'error'
type FormActionTypes = 'addContent' | 'sendEmail'

type FormDataType = {
    id?: string | number
    title: string,
    showTitle?: boolean,
    type: 'database' | 'email',
    endpoint: string,
    fields: FormFieldProps[],
    status: {
        success: { message: string },
        error: { message: string }
    }
}

interface FormContainerProps {
    data: FormDataType
}

interface FormProps {
    locale: LocaleTypes
    data: FormDataContentType
}

type FieldTypes = {
    [k: string]: React.ReactNode;
};

interface FormFieldProps {
    id: string | number
    label: string
    name: string
    placeholder?: string
    defaultValue?: string
    type?: string
    fieldType?: string
    options?: OptionsType[]
    disabled?: boolean
    required?: boolean
    content: string
}

interface FormTitleProps {
    title?: string;
}

interface FormGroupProps {
    id: string | undefined
    pending: boolean
    label: string
    children: React.ReactNode
    required?: boolean
}

interface FormCollectionListProps {
    id: string | undefined
    name: string
    pending: boolean
    options: OptionsType[]
}
