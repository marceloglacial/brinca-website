import { FC } from 'react';
import PartnersListItem from './PartnersListItem';

const PartnersListMenu: FC<PartnersListMenuProps> = (props): JSX.Element => {
  if (props.items.length === 0) return <></>;

  return (
    <div className='partners-list-categories flex flex-col gap-4'>
      <h4 className='partners-list-categories__title'>
        {props.title[props.locale]}
      </h4>
      <div className='partners-list-categories__menu flex flex-wrap gap-4'>
        {props.items.map((item) => (
          <PartnersListItem key={item.id} {...item} locale={props.locale} />
        ))}
      </div>
    </div>
  );
};

export default PartnersListMenu;
