import { FC } from 'react';
import PartnerCard from './PartnerCard';

const PartnersSection: FC<PartnersSectionProps> = (props): JSX.Element => {
  if (props.items.length === 0) return <></>;
  return (
    <div className='grid grid-cols-1 gap-8'>
      <h4>{props.title[props.locale]}</h4>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {props.items.map((item) => (
          <PartnerCard key={item.id} locale={props.locale} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
