import { FC } from 'react';
import PartnersListMenu from './PartnersListMenu';
import PartnersSection from './PartnersSection';
import PartnerCard from './PartnerCard';
import { getPartners } from '@/services';

export const PartnersList: FC<PartnersListProps> = async (
  props
): Promise<JSX.Element> => {
  const result = await getPartners();

  if (result.status === 'error') return <>Error</>;

  const content = result.data;

  return (
    <div className='partners-list pt-8 grid grid-cols-1 gap-16'>
      {/* <PartnersListMenu locale={props.language} /> */}

      <div className='grid grid-cols-1 gap-8'>
        <h4>Partners</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {content.map((item) => (
            <PartnerCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
