import { FC } from 'react'
import { LocaleListItem } from './LocaleListItem'

export const LocaleListItems: FC<LocaleListItemsProps> = (props) => {
  const locales = props.items

  return (
    <div className={'mx-auto flex gap-4 items-center'}>
      {locales.map((item, index) => (
        <LocaleListItem key={index} {...item} />
      ))}
    </div>
  )
}
