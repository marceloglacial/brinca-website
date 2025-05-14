import { FC } from 'react'
import { LocaleListItems } from './LocaleListItems'
import { getPageBySlug } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'

export const LocaleList: FC = async () => {
  const data = await getPageBySlug('locales')

  if (data.status >= HttpStatusSchema.enum.BAD_REQUEST) {
    console.error(`Error: ${data.message}`)
    return <></>
  }

  return <LocaleListItems items={data.data as LocaleListType[]} />
}
