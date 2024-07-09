
type FormDataContentType = {
    title?: LocalizedString,
    formId: string
}

interface FormFieldsProps {
    data: {
        fields: any[]
    }
}

interface FormProps {
    language: string
    data: FormDataContentType
}

type FieldTypes = {
    [k: string]: React.ReactNode;
};

interface FormFieldProps {
    language: string;
    attributes: any;
}
