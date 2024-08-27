'use client';
import { FC } from 'react';
import { Form } from '@marceloglacial/brinca-ui';
import { useFormStatus } from 'react-dom';
import { FormSubmitButton } from './FormSubmitButton';
import { FormCollectionList } from './FormCollectionList';
import { DICTIONARY } from '@/constants';
import { useParams } from 'next/navigation';

export const FormField: FC<FormFieldProps> = (props): JSX.Element => {
  const { pending } = useFormStatus();

  if (props.type === 'submit') return <FormSubmitButton value={props.label} />;

  switch (props.fieldType) {
    case 'input':
      return (
        <FormGroup
          label={props.label}
          pending={pending}
          required={props.required}
        >
          <Form.Input
            disabled={pending}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            name={props.name}
            type={props.type}
            required={props.required}
            full
          />
        </FormGroup>
      );

    case 'textarea':
      return (
        <FormGroup
          label={props.label}
          pending={pending}
          required={props.required}
        >
          <Form.Textarea
            disabled={pending}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            name={props.name}
            required={props.required}
            rows={10}
            full
          />
        </FormGroup>
      );

    case 'collectionlist':
      return (
        <FormGroup
          label={props.label}
          pending={pending}
          required={props.required}
        >
          <FormCollectionList pending={pending} options={props.options || []} />
        </FormGroup>
      );
    case 'select':
      return (
        <FormGroup
          label={props.label}
          pending={pending}
          required={props.required}
        >
          <Form.Select
            disabled={pending}
            required={props.required}
            options={props.options || []}
            full
          />
        </FormGroup>
      );

    case 'checkbox':
      return (
        <Checkbox
          disabled={pending}
          required={props.required}
          label={props.label}
          name={props.name}
        />
      );

    default:
      return <></>;
  }
};

const Checkbox: FC<FormFieldProps> = (props): JSX.Element => {
  return (
    <Form.Group>
      <div className='flex gap-4 items-start'>
        <Form.Input
          name={props.name}
          type='checkbox'
          required={props.required}
          disabled={props.disabled}
        />
        <Form.Label htmlFor={props.name}>{props.label}</Form.Label>
      </div>
    </Form.Group>
  );
};

const FormGroup: FC<FormGroupProps> = (props): JSX.Element => {
  const params = useParams();
  return (
    <div className={props.pending ? 'opacity-50' : ''}>
      <Form.Group>
        <Form.Label>
          {props.label}{' '}
          {props.required && (
            <span className=' lowercase font-normal text-gray-400'>
              ({DICTIONARY.FORM_REQUIRED[params.locale as LocaleTypes]})
            </span>
          )}
        </Form.Label>
        {props.children}
      </Form.Group>
    </div>
  );
};
