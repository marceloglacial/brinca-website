import { formatAttributes, formatOptions } from '@/services';
import { Form } from '@marceloglacial/brinca-ui';
import { FC } from 'react';

export const FormField: FC<FormFieldProps> = (props): JSX.Element => {
  const fieldTypes: FieldTypes = {
    textarea: <Form.Textarea {...formatAttributes(props)} full />,
    submit: <Form.Input {...formatAttributes(props)} />,
    select: <Form.Select options={formatOptions(props)} full />,
    checkbox: <Checkbox {...props} />,
    default: <Form.Input {...formatAttributes(props)} full />,
  };

  return (
    <Form.Group>
      {props.attributes.label && (
        <Form.Label>{props.attributes.label[props.language]}</Form.Label>
      )}
      {fieldTypes[props.attributes.type] || fieldTypes['default']}
    </Form.Group>
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
