import { getPageDataBySlug } from '@/lib'
import { FC } from 'react'
import { LocaleListItems } from './LocaleListItems'

export const LocaleList: FC = async () => {
  const data = await getPageDataBySlug('locales')

  if (data.status === 'error') {
    console.error(`Error: ${data.message}`)
    return <></>
  }

  return <LocaleListItems items={data.data as LocaleListType[]} />
}
