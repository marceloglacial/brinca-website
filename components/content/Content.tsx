import { Block } from '@/components'
import { FC } from 'react'

export const Content: FC<ContentProps> = ({ items, locale }) => {
  if (!items || items.length === 0) return <></>

  return (
    <>
      {items.map((item, index) => {
        return <Block key={index} content={item} locale={locale} />
      })}
    </>
  )
}
