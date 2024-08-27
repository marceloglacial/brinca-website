type FormDataContentType = {
    title?: LocalizedString,
    formId: string
}

type FormStatus = 'success' | 'error'
type FormActionTypes = 'addContent' | 'sendEmail'

interface FormContainerProps {
    data: {
        title?: string
        type: 'database' | 'email'
        endpoint: string
        fields: any[]
        status: {
            success: { message: string },
            error: { message: string }
        }
    }
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
