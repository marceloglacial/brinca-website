'use client'

import { COLLECTIONS, DICTIONARY } from '@/constants'
import { Form } from '@/components/ui'
import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { getAllByCollection } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'
import { Collection } from '@/types/new-api'

export const FormPartnersList: FC<FormPartnersListProps> = (props) => {
  const [data, setData] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()

  const locale = params.locale as LocalesType

  useEffect(() => {
    async function fetchData() {
      const response = await getAllByCollection(COLLECTIONS.CATEGORIES, { locale })

      if (response.status >= HttpStatusSchema.enum.BAD_REQUEST) {
        throw new Error(DICTIONARY.FORM_ERROR[locale])
      }
      setData(response.data)
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
