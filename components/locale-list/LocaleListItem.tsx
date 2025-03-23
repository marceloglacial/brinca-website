import { FC } from 'react'
export const LocaleListItem: FC<LocaleListType> = (props) => {
  return (
    <a
      href={`/${props.slug}`}
      title={props.title}
      className='flex text-2xl hover:opacity-50 transition-opacity ease-out duration-[0.25s]'
    >
      {props.icon}
    </a>
  )
}
