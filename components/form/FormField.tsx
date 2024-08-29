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
  const fieldId = `${props.fieldType}-${props.id?.toString()}`;

  switch (props.fieldType) {
    case 'text-editor':
      return (
        <FormGroup
          id={fieldId}
          label={''}
          pending={pending}
          required={props.required}
        >
          <div dangerouslySetInnerHTML={{ __html: props.content }} />
        </FormGroup>
      );
    case 'input':
      if (props.type === 'checkbox') return <Checkbox {...props} />;
      return (
        <FormGroup
          id={fieldId}
          label={props.label}
          pending={pending}
          required={props.required}
        >
          <Form.Input
            id={fieldId}
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
          id={fieldId}
          label={props.label}
          pending={pending}
          required={props.required}
        >
          <Form.Textarea
            id={fieldId}
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
          id={fieldId}
          label={props.label}
          pending={pending}
          required={props.required}
        >
          <FormCollectionList
            id={fieldId}
            name={props.name}
            pending={pending}
            options={props.options || []}
          />
        </FormGroup>
      );
    case 'select':
      return (
        <FormGroup
          id={fieldId}
          label={props.label}
          pending={pending}
          required={props.required}
        >
          <Form.Select
            id={fieldId}
            name={props.name}
            disabled={pending}
            required={props.required}
            options={props.options || []}
            full
          />
        </FormGroup>
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
          id={`checkbox-${props.id}`}
          type='checkbox'
          required={props.required}
        />
        <Form.Label htmlFor={`checkbox-${props.id}`}>{props.label}</Form.Label>
      </div>
    </Form.Group>
  );
};

const FormGroup: FC<FormGroupProps> = (props): JSX.Element => {
  const params = useParams();
  return (
    <div className={props.pending ? 'opacity-50' : ''}>
      <Form.Group>
        <Form.Label htmlFor={props.id?.toString()}>
          {props.label}{' '}
          {props.required && (
            <span className=' lowercase font-normal text-gray-600'>
              ({DICTIONARY.FORM_REQUIRED[params.locale as LocaleTypes]})
            </span>
          )}
        </Form.Label>
        {props.children}
      </Form.Group>
    </div>
  );
};
