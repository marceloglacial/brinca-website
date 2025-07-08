'use client'

import { DICTIONARY } from '@/constants'
import { Form } from '@/components/ui'
import { FC, useId } from 'react'
import { useFormStatus } from 'react-dom'
import { FormPartnersList } from './FormPartnersList'

export const FormField: FC<FieldType> = (props) => {
  const { pending } = useFormStatus()
  const id = useId()
  const fieldStr = typeof props.value === 'string' ? props.value : ''
  const fieldObj = typeof props.value === 'object' ? props.value : ({} as FieldValue)
  const label = fieldObj.label

  const getFormField = () => {
    if (fieldStr === 'category_partners') return <FormPartnersList pending={pending} />

    switch (props.type) {
      case 'text':
        if (fieldObj.localized) {
          return Object.keys(DICTIONARY.LOCALES).map((localeKey) => (
            <Form.Input
              id={`${id}-${props.type}-${localeKey}`}
              key={localeKey}
              type={fieldObj.input_type}
              name={`${fieldObj.name}_${localeKey}`}
              placeholder={DICTIONARY.LOCALES[localeKey as LocalesType]}
              required={fieldObj.required}
              disabled={pending}
              full
            />
          ))
        }
        return (
          <Form.Input
            id={`${id}-${props.type}`}
            type={fieldObj.input_type}
            name={fieldObj.name}
            placeholder={fieldObj.placeholder}
            required={fieldObj.required}
            disabled={pending}
            full
          />
        )

      case 'textarea':
        if (fieldObj.localized) {
          return Object.keys(DICTIONARY.LOCALES).map((localeKey) => (
            <Form.Textarea
              id={`${id}-${props.type}-${localeKey}`}
              key={localeKey}
              name={`${fieldObj.name}_${localeKey}`}
              placeholder={DICTIONARY.LOCALES[localeKey as LocalesType]}
              required={fieldObj.required}
              disabled={pending}
              rows={10}
              full
            />
          ))
        }
        return (
          <Form.Textarea
            id={`${id}-${props.type}`}
            name={fieldObj.name}
            placeholder={fieldObj.placeholder}
            required={fieldObj.required}
            rows={10}
            disabled={pending}
            full
          />
        )

      case 'select':
        return (
          <Form.Select
            id={`${id}-${props.type}`}
            name={fieldObj.name}
            options={(fieldObj.options ?? []).map<OptionsType>((option) => ({
              label: option.title,
              value: option.value,
            }))}
            required={fieldObj.required}
            disabled={pending}
            full
          />
        )

      case 'plain_text':
        return <p className='text-sm'>{fieldObj.title}</p>

      case 'checkbox':
        return <Form.Input name={fieldObj.name} id={`${id}-${props.type}`} type='checkbox' />

      case 'submit':
        return (
          <Form.Input
            id={`${id}-${props.type}`}
            type='submit'
            value={fieldObj.title}
            disabled={pending}
          />
        )
      default:
        return <></>
    }
  }

  if (props.type === 'checkbox') {
    const label = fieldObj.title

    return (
      <div className={`relative ${pending ? 'opacity-50' : ''}`}>
        <Form.Group>
          {getFormField()}
          {label && (
            <Form.Label htmlFor={`${id}-${props.type}`}>
              <span className='text-sm font-light'>{label}</span>
            </Form.Label>
          )}
        </Form.Group>
      </div>
    )
  }

  return (
    <div className={`relative ${pending ? 'opacity-50' : ''}`}>
      <Form.Group>
        {label && <Form.Label htmlFor={`${id}-${props.type}`}>{label}</Form.Label>}
        {getFormField()}
      </Form.Group>
    </div>
  )
}
