export const formatAttributes = (props: FormFieldProps) => {
    const result = {
        ...props.attributes,
        placeholder: props.attributes.placeholder?.[props.language],
        value: props.attributes.value?.[props.language],
    };
    delete result.label;
    return result;
};

export const formatOptions = (props: FormFieldProps) => {
    return props.attributes.options?.map((option: any) => ({
        label: option.label[props.language],
        value: option.value,
    }));
};
