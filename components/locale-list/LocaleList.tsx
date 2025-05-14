import { FC } from 'react'
import { LocaleListItems } from './LocaleListItems'
import { getCollection } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'
import { COLLECTIONS } from '@/constants'

export const LocaleList: FC = async () => {
  const data = await getCollection(COLLECTIONS.LOCALES, {})

  if (data.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    console.error(`Error: ${data.message}`)
    return <></>
  }

  return <LocaleListItems items={data.data as LocaleListType[]} />
}
