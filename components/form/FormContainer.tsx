'use client'
import { FormField, FormTitle } from '@/components'
import { DICTIONARY } from '@/constants'
import { handleFormSubmission } from '@/lib'
import { Link, Section } from '@/components/ui'
import { useParams } from 'next/navigation'
import { FC, useState } from 'react'

export const FormContainer: FC<FormContainerProps> = (props) => {
  const { locale } = useParams<{ locale: LocalesType }>()
  const [formSubmitted, setFormSubmitted] = useState<FormSubmissionType>(null)
  const form = props.data

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleFormSubmission(e, setFormSubmitted)
  }

  const file_download = form.fields.find((field) => field.type === 'file_download')

  if (formSubmitted && file_download) {
    const value = file_download.value as FieldValue
    return (
      <div className='mt-16 text-center'>
        <Section spacing='m'>
          <h4>{value.title}</h4>
          <div>
            <a href={value.file_url} target='_blank' rel='noreferrer'>
              <Link variant='primary'>{DICTIONARY.FORM_FILE_DOWNLOAD[locale]}</Link>
            </a>
          </div>
        </Section>
      </div>
    )
  }

  if (formSubmitted) {
    return (
      <div className='mt-16 text-center'>
        <Section spacing='s'>
          <h4>{DICTIONARY.FORM_SUCCESS[locale]}</h4>
          <p>{DICTIONARY.FORM_RESPONSE[locale]}</p>
        </Section>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {form.show_title && <FormTitle>{form.title}</FormTitle>}
        <input type='hidden' name='formTitle' value={form.title} />
        <input type='hidden' name='formType' value={form.submit_type} />
        <input type='hidden' name='formEndpoint' value={form?.collection_id} />
        <input type='hidden' name='formLocale' value={locale} />
        <div className='mx-auto grid max-w-screen-md grid-cols-1 gap-4'>
          {form.fields.map((field, index) => (
            <FormField key={index} {...field} />
          ))}
        </div>
      </form>
    </>
  )
}
