'use client';
import { FC } from 'react';
import { Form } from '@marceloglacial/brinca-ui';
import { useFormStatus } from 'react-dom';

export const FormField: FC<FieldType> = (props): JSX.Element => {
  const { pending } = useFormStatus();

  const field = props.value;
  const label = field.label;
  const hasProp = (prop: any) =>
    Object.values(prop || {}).some((value) => value) ? prop : '';
  const getFormField = () => {
    switch (props.type) {
      case 'text':
        return (
          <Form.Input
            type={field.input_type}
            name={field.name}
            placeholder={hasProp(field.placeholder)}
            required={field.required}
            full
          />
        );
      case 'textarea':
        return (
          <Form.Textarea
            name={field.name}
            placeholder={hasProp(field.placeholder)}
            required={field.required}
            full
          />
        );
      case 'select':
        return (
          <Form.Select
            name={field.name}
            options={field.options.map((option: OptionsType) => ({
              label: option.title,
              value: option.value,
            }))}
            required={field.required}
            full
          />
        );
      case 'submit':
        return <Form.Input type='submit' value={field.title} />;
      default:
        return <></>;
    }
  };

  return (
    <div className={pending ? 'opacity-50' : ''}>
      <Form.Group>
        {label && <Form.Label>{label}</Form.Label>}
        {getFormField()}
      </Form.Group>
    </div>
  );
};
