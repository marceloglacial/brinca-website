import { Block } from '@/components'
import { FC } from 'react'

export const Content: FC<ContentProps> = ({ items, locale }) => {
  if (!items.length) return <></>

  return (
    <>
      {items.map((item: BlockType, index: number) => {
        return <Block key={index} content={item} locale={locale} />
      })}
    </>
  )
}
