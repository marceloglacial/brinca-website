import { FC } from 'react';
import PartnersListMenu from './PartnersListMenu';
import PartnersSection from './PartnersSection';

export const PartnersList: FC<PartnersListProps> = async (
  props
): Promise<JSX.Element> => {
  return (
    <div className='partners-list pt-8 grid grid-cols-1 gap-16'>
      <PartnersListMenu locale={props.locale} />
      <PartnersSection locale={props.locale} isMember />
      <PartnersSection locale={props.locale} />
    </div>
  );
};
