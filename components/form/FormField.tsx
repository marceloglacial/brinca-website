'use client';
import { FC } from 'react';
import { Form } from '@marceloglacial/brinca-ui';
import { useFormStatus } from 'react-dom';
import { FormSubmitButton } from './FormSubmitButton';
import { FormCollectionList } from './FormCollectionList';
import { useParams } from 'next/navigation';

export const FormField: FC<FormFieldProps> = (props): JSX.Element => {
  const { pending } = useFormStatus();
  const params = useParams();

  switch (props.fieldType) {
    case 'input':
      return (
        <FormGroup label={props.label} pending={pending}>
          <Form.Input
            disabled={pending}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            name={props.name}
            type={props.type}
            full
          />
        </FormGroup>
      );
    case 'textarea':
      return (
        <FormGroup label={props.label} pending={pending}>
          <Form.Textarea
            disabled={pending}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            name={props.name}
            full
          />
        </FormGroup>
      );

    case 'submit':
      return <FormSubmitButton value={props.label} />;

    case 'collectionlist':
      return (
        <FormGroup label={props.label} pending={pending}>
          <FormCollectionList {...props} locale={params.locale} />
        </FormGroup>
      );

    default:
      return <></>;
  }

  // const fieldTypes: FieldTypes = {
  //   textarea: <Form.Textarea rows={10} disabled={pending} {...props} full />,
  //   submit: <Form.Input disabled={pending} {...props} />,
  //   select: (
  //     // <Form.Select disabled={pending} options={formatOptions(props)} full />
  //     <></>
  //   ),
  //   checkbox: <Checkbox {...props} />,
  //   default: <Form.Input disabled={pending} {...props} full />,
  // };

  // return (
  //   <div className={pending ? 'opacity-50' : ''}>
  //     <Form.Group>
  //       {props.label && <Form.Label>{props.label}</Form.Label>}
  //       {fieldTypes[props.type] || fieldTypes['default']}
  //     </Form.Group>
  //   </div>
  // );
};

const Checkbox: FC<FormFieldProps> = (props) => {
  return (
    <Form.Group>
      <div className='flex gap-4 items-start'>
        <Form.Input id={props.id} type='checkbox' />
        <Form.Label htmlFor={props.id}>{props.value}</Form.Label>
      </div>
    </Form.Group>
  );
};

const FormGroup = (props) => {
  return (
    <div className={props.pending ? 'opacity-50' : ''}>
      <Form.Group>
        {props.label && <Form.Label>{props.label}</Form.Label>}
        {props.children}
      </Form.Group>
    </div>
  );
};
