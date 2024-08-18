import { FC } from 'react';
import PartnerCard from './PartnerCard';
import { getContentByType } from '@/services';
import { COLLECTIONS, DICTIONARY } from '@/constants';
import { formatContentListData } from '@/utils';

const PartnersSection: FC<PartnersSectionProps> = async (
  props
): Promise<JSX.Element> => {
  const filterQuery = props.filter
    ? `&filters[category][slug][$eq]=${props.filter}`
    : '';

  const filters = props.isMember
    ? `[memberEmail][$ne]=''${filterQuery}`
    : `[memberEmail][$null]=true${filterQuery}`;

  const response = await getContentByType(
    COLLECTIONS.PARTNERS,
    props.locale,
    100,
    'title',
    'asc',
    filters
  );

  if ('error' in response) return <>Error loading content</>;

  const items = formatContentListData(response.data);

  if (items.length === 0) return <></>;

  return (
    <div className='grid grid-cols-1 gap-8'>
      <h4>
        {props.isMember
          ? DICTIONARY.MEMBERS_TITLE[props.locale]
          : DICTIONARY.COMMUNITY_TITLE[props.locale]}
      </h4>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {items.map((item: any) => (
          <PartnerCard key={item.id} locale={props.locale} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
