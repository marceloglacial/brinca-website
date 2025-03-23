import { FC } from 'react'
import { LocaleListItem } from './LocaleListItem'

export const LocaleListItems: FC<LocaleListItemsProps> = (props) => {
  const locales = props.items

  return (
    <div className={'mx-auto flex items-center gap-4'}>
      {locales.map((item, index) => (
        <LocaleListItem key={index} {...item} />
      ))}
    </div>
  )
}
