'use client';
import { FC } from 'react';
import { formatAttributes, formatOptions } from '@/services';
import { Form } from '@marceloglacial/brinca-ui';
import { useFormStatus } from 'react-dom';

export const FormField: FC<FormFieldProps> = (props): JSX.Element => {
  const { pending } = useFormStatus();

  const fieldTypes: FieldTypes = {
    textarea: (
      <Form.Textarea
        rows={10}
        disabled={pending}
        {...formatAttributes(props)}
        full
      />
    ),
    submit: <Form.Input disabled={pending} {...formatAttributes(props)} />,
    select: (
      <Form.Select disabled={pending} options={formatOptions(props)} full />
    ),
    checkbox: <Checkbox {...props} />,
    default: (
      <Form.Input disabled={pending} {...formatAttributes(props)} full />
    ),
  };

  return (
    <div className={pending ? 'opacity-50' : ''}>
      <Form.Group>
        {props.attributes.label && (
          <Form.Label>{props.attributes.label[props.language]}</Form.Label>
        )}
        {fieldTypes[props.attributes.type] || fieldTypes['default']}
      </Form.Group>
    </div>
  );
};

const Checkbox: FC<FormFieldProps> = (props) => {
  return (
    <Form.Group>
      <div className='flex gap-4 items-start'>
        <Form.Input id={props.attributes.id} type='checkbox' />
        <Form.Label htmlFor={props.attributes.id}>
          {props.attributes.value[props.language]}
        </Form.Label>
      </div>
    </Form.Group>
  );
};
