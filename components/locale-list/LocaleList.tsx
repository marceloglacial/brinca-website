import { FC } from 'react'
import { LocaleListItems } from './LocaleListItems'
import { getAllByCollection } from '@/lib/api'
import { COLLECTIONS } from '@/constants'
import { HttpStatusSchema } from '@/schemas/api'

export const LocaleList: FC = async () => {
  const response = await getAllByCollection(COLLECTIONS.LOCALES, {})

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    console.error(`Error: ${response.message}`)
    return <></>
  }

  return <LocaleListItems items={response.data as LocaleListType[]} />
}
