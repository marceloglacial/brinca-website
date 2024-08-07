import { FC } from 'react';
export const LocaleListItem: FC<LocaleListType> = (props): JSX.Element => {
  return (
    <a
      href={`/${props.locale}`}
      title={props.title}
      className='inline-block text-2xl'
    >
      {props.icon}
    </a>
  );
};
