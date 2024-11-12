export const formatAttributes = (props: FormFieldProps) => {
    const result = {
        ...props.attributes,
        placeholder: props.attributes.placeholder?.[props.language],
        value: props.attributes.value?.[props.language],
    };
    delete result.label;
    return result;
};
