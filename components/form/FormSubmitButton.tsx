'use client';
import { Form } from '@marceloglacial/brinca-ui';
import { useFormStatus } from 'react-dom';

export function FormSubmitButton(props: { value: string }) {
  const { pending } = useFormStatus();

  return (
    <Form.Input
      id='inputButton'
      type='submit'
      disabled={pending}
      value={props.value}
    />
  );
}
