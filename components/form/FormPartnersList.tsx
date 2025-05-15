'use client'
import { getSelectCategoriesData } from '@/actions'
import { DICTIONARY } from '@/constants'
import { Form } from '@/components/ui'
import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { HttpStatusSchema } from '@/schemas/api'
import { Collection } from '@/types'
import { OptionsType } from '../ui/Form/FormSelect'

export const FormPartnersList: FC<FormPartnersListProps> = (props) => {
  const [data, setData] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()

  const locale = params.locale as LocalesType

  useEffect(() => {
    async function fetchData() {
      const result = await getSelectCategoriesData(locale)

      if (result?.status >= HttpStatusSchema.enum.BAD_REQUEST) {
        throw new Error(DICTIONARY.FORM_ERROR[locale])
      }
      setData(result.data ?? [])
      setIsLoading(false)
    }

    fetchData()
  }, [locale])

  if (isLoading) return <>loading ...</>

  const options = data.map<OptionsType>((d) => ({
    label: d.title,
    value: d.id,
  }))
  options.push({
    label: DICTIONARY.FORM_OTHER_CATEGORY_OPTION[locale],
    value: 'none',
  })

  return (
    <div className={`w-full ${props.pending ? 'opacity-50' : ''}`}>
      <Form.Group>
        <Form.Label>{DICTIONARY.FORM_CATEGORIES[locale]}</Form.Label>
        <Form.Select
          name={'category'}
          options={options}
          required={true}
          disabled={props.pending}
          full
        />
      </Form.Group>
    </div>
  )
}
