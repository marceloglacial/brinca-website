'use client';
import { Form } from '@marceloglacial/brinca-ui';
import { useFormStatus } from 'react-dom';

export function FormSubmitButton(props: { value: string }) {
  const { pending } = useFormStatus();

  return (
    <div className={pending ? 'opacity-50' : ''}>
      <Form.Input
        id='inputButton'
        type='submit'
        disabled={pending}
        value={props.value}
      />
    </div>
  );
}
