'use client'
import { FormField, FormTitle } from '@/components'
import { DICTIONARY } from '@/constants'
import { handleFormSubmission } from '@/lib'
import { localizedContent } from '@/utils'
import { Link, Section } from '@/components/ui'
import { useParams } from 'next/navigation'
import { FC, useState } from 'react'

export const FormContainer: FC<FormContainerProps> = (props) => {
  const params = useParams()
  const [formSubmited, setformSubmited] = useState<FormSubmissionType>(null)

  const locale = params.locale as LocalesType
  const form = localizedContent(props.data, locale) as FormType

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleFormSubmission(e, setformSubmited)
  }

  const file_download = form.fields.find((field) => field.type === 'file_download')

  if (!formSubmited && file_download) {
    return (
      <div className='mt-16 text-center'>
        <Section spacing='m'>
          <h4>{file_download.value.title}</h4>
          <div>
            <a href={file_download.value.file_url} target='_blank' rel='noreferrer'>
              <Link variant='primary'>{DICTIONARY.FORM_FILE_DOWNLOAD[locale]}</Link>
            </a>
          </div>
        </Section>
      </div>
    )
  }

  if (formSubmited) {
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
