'use client'
import { DICTIONARY } from '@/constants'
import { localizedContent } from '@/utils'
import { Form } from '@/components/ui'
import { useParams } from 'next/navigation'
import { FC, useId } from 'react'
import { useFormStatus } from 'react-dom'
import { FormPartnersList } from './FormPartnersList'

export const FormField: FC<FieldType> = (props) => {
  const { pending } = useFormStatus()
  const id = useId()
  const params = useParams()

  const field = localizedContent(props.value)
  const multiField = props.value
  const label = field.label

  const getFormField = () => {
    if (field === 'category_partners') return <FormPartnersList pending={pending} />

    switch (props.type) {
      case 'text':
        if (field.localized) {
          return (
            <>
              {Object.keys(DICTIONARY.LOCALES).map((localeKey) => (
                <Form.Input
                  id={`${id}-${props.type}-${localeKey}`}
                  key={localeKey}
                  type={multiField.input_type}
                  name={`${multiField.name}_${localeKey}`}
                  placeholder={DICTIONARY.LOCALES[localeKey as keyof typeof DICTIONARY.LOCALES]}
                  required={multiField.required}
                  disabled={pending}
                  full
                />
              ))}
            </>
          )
        }
        return (
          <Form.Input
            id={`${id}-${props.type}`}
            type={field.input_type}
            name={field.name}
            placeholder={field.placeholder[params.locale as string]}
            required={field.required}
            disabled={pending}
            full
          />
        )

      case 'textarea':
        if (field.localized) {
          return (
            <>
              {Object.keys(DICTIONARY.LOCALES).map((localeKey) => (
                <Form.Textarea
                  id={`${id}-${props.type}-${localeKey}`}
                  key={localeKey}
                  name={`${multiField.name}_${localeKey}`}
                  placeholder={DICTIONARY.LOCALES[localeKey as keyof typeof DICTIONARY.LOCALES]}
                  required={multiField.required}
                  disabled={pending}
                  rows={10}
                  full
                />
              ))}
            </>
          )
        }
        return (
          <Form.Textarea
            id={`${id}-${props.type}`}
            name={field.name}
            placeholder={field.placeholder[params.locale as string]}
            required={field.required}
            rows={10}
            disabled={pending}
            full
          />
        )

      case 'select':
        return (
          <Form.Select
            id={`${id}-${props.type}`}
            name={field.name}
            options={field.options.map((option: OptionsType) => ({
              label: option.title,
              value: option.value,
            }))}
            required={field.required}
            disabled={pending}
            full
          />
        )

      case 'plain_text':
        return <p className='text-sm'>{field.title}</p>

      case 'checkbox':
        return <Form.Input name={field.name} id={`${id}-${props.type}`} type='checkbox' />

      case 'submit':
        return (
          <Form.Input
            id={`${id}-${props.type}`}
            type='submit'
            value={field.title}
            disabled={pending}
          />
        )
      default:
        return <></>
    }
  }

  if (props.type === 'checkbox') {
    const label = localizedContent(props.value.title)

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
