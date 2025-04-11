import { FC } from 'react'
import { Icon } from '../icon/Icon'
export const LocaleListItem: FC<LocaleListType> = (props) => {
  return (
    <a
      href={`/${props.slug}`}
      title={props.title}
      className='flex text-2xl transition-opacity duration-[0.25s] ease-out hover:opacity-50'
    >
      <Icon type={props.slug === 'en' ? 'canadaFlag' : 'brazilFlag'} />
    </a>
  )
}
