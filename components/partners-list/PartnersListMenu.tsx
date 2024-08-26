import { FC } from 'react';
import PartnersListItem from './PartnersListItem';
import { getContentByType } from '@/services';
import { COLLECTIONS, DICTIONARY } from '@/constants';
import { formatContentListData } from '@/utils';
import { ErrorState } from '@/components';

const PartnersListMenu: FC<PartnersListMenuProps> = async (
  props
): Promise<JSX.Element> => {
  const response = await getContentByType(
    COLLECTIONS.PARTNERS_CATEGORY,
    props.locale,
    100,
    'title',
    'asc'
  );

  if ('error' in response) return <ErrorState />;

  const items: PartnersListItemProps[] = formatContentListData(response.data);

  if (items.length === 0) return <></>;

  return (
    <div className='partners-list grid gap-8'>
      <h4>{DICTIONARY.CATEGORIES_TITLE[props.locale]}</h4>
      <div className='partners-list-categories__menu flex flex-wrap gap-4'>
        {items.map((item) => (
          <PartnersListItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PartnersListMenu;
