
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
    placeholder: string
    defaultValue: string
    name: string
    type: string
    fieldType: string
}

interface FormTitleProps {
    title?: string;
}
