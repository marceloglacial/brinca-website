import { FC } from 'react';
import { Icon } from '@/components';
export const LocaleListItem: FC<LocaleListType> = (props): JSX.Element => {
  return (
    <a
      href={`/${props.code}`}
      title={props.name}
      className='inline-block text-2xl'
    >
      <Icon type={props.code} />
    </a>
  );
};
