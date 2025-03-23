'use client'
import { getSelectFieldData } from '@/actions'
import { DICTIONARY } from '@/constants'
import { localizedData } from '@/utils'
import { Form } from '@/components/ui'
import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

export const FormPartnersList: FC<FormPartnersListProps> = (props) => {
  const [data, setData] = useState<ApiResponse<CategoryType[]> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()

  const locale = params.locale as LocalesType

  useEffect(() => {
    async function fetchData() {
      const result = await getSelectFieldData()

      if (result?.status === 'error') {
        throw new Error(DICTIONARY.FORM_ERROR[locale])
      }
      setData(result)
      setIsLoading(false)
    }

    fetchData()
  }, [locale])

  if (isLoading) return <>loading ...</>

  const options = localizedData(data?.data, locale).sort((a: any, b: any) =>
    a.title.localeCompare(b.title)
  )

  options.push({
    value: 'none',
    title: 'Outra - Entratemos em contato',
  })

  return (
    <div className={`w-full ${props.pending ? 'opacity-50' : ''}`}>
      <Form.Group>
        <Form.Label>{DICTIONARY.FORM_CATEGORIES[locale]}</Form.Label>
        <Form.Select
          name={'category'}
          options={options.map((option: OptionsType) => ({
            label: option.title,
            value: option.id,
          }))}
          required={true}
          disabled={props.pending}
          full
        />
      </Form.Group>
    </div>
  )
}
