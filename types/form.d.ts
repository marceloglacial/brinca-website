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
    label: string
    name: string
    placeholder?: string
    defaultValue?: string
    type?: string
    fieldType?: string
    options?: OptionsType[]
    disabled?: boolean
    required?: boolean
}

interface FormTitleProps {
    title?: string;
}

interface FormGroupProps {
    pending: boolean
    label: string
    children: React.ReactNode
    required?: boolean
}

interface FormCollectionListProps {
    pending: boolean
    options: OptionsType[]
}
