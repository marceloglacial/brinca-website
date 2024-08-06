
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
