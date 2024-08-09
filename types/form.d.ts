
type FormDataContentType = {
    title?: LocalizedString,
    formId: string
}

type FormStatus = 'success' | 'error'


interface FormFieldsProps {
    data: {
        action: {
            endpoint: string
            type: 'addContent' | 'email'
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
    language: LocaleTypes
    data: FormDataContentType
}

type FieldTypes = {
    [k: string]: React.ReactNode;
};

interface FormFieldProps {
    language: LocaleTypes;
    attributes: any;
}

interface FormContainerProps extends FormFieldsProps {
    language: LocaleTypes;
}


interface FormTitleProps {
    title?: LocalizedString;
    language: LocaleTypes;
}
