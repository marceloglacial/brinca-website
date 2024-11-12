
type FormDataContentType = {
    title?: LocalizedString,
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
            success: { message: LocalizedString },
            error: { message: LocalizedString }
        }
    }
}

interface FormProps {
    id: string
}

type FormType = {
    id: string,
    show_title: boolean,
    submit_type: 'email' | 'collection'
    title: string
    fields: FieldType[]
}

type FieldTypes = 'text' | 'textarea' | 'select' | 'submit'
type FieldType = {
    type: FieldTypes
    value: any
};

type OptionsType = {
    title: string,
    value: string
}


interface FormFieldProps {
    language: LocaleTypes;
    attributes: any;
}

interface FormContainerProps extends FormFieldsProps {
    data: FormType;
}


interface FormTitleProps {
    title?: string;
}
