import { FC } from 'react';
import PartnerCard from './PartnerCard';
import { getDataByType } from '@/services';
import { COLLECTIONS } from '@/constants';
import { filterItemsByCategory } from '@/utils';

const PartnersSection: FC<PartnersSectionProps> = async (
  props
): Promise<JSX.Element> => {
  const data = await getDataByType(COLLECTIONS.PARTNERS);
  const filteredData: PartnerType[] = data.data.filter(
    (partner: PartnerType) => partner.isActive && partner.type === props.type
  );
  const items = filterItemsByCategory(
    filteredData,
    props.locale,
    props.category
  );
  if (items.length === 0) return <></>;

  return (
    <div className='grid grid-cols-1 gap-8'>
      <h4>{props.title[props.locale]}</h4>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {items.map((item) => (
          <PartnerCard key={item.id} locale={props.locale} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
