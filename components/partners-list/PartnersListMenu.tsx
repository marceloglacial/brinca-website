import { FC } from 'react';
import PartnersListItem from './PartnersListItem';
import { getCollectionById } from '@/services';
import { COLLECTIONS, DICTIONARY, ROUTES } from '@/constants';
import PartnerListTitle from './PartenerListTitle';
import Alert from '../alert/Alert';

const PartnersListMenu: FC = async (): Promise<JSX.Element> => {
  const result = await getCollectionById(COLLECTIONS.CATEGORIES);

  if (result.status === 'error') {
    return <Alert message={'Error loading categories!'} />;
  }

  const categories = result.data as CategoryType[];
  if (!categories.length) return <></>;

  return (
    <div className='partners-list-categories flex flex-col gap-4'>
      <PartnerListTitle />
      <div className='partners-list-categories__menu flex flex-wrap gap-4'>
        <PartnersListItem title={DICTIONARY.ALL} slug={ROUTES.PARTNERS_ALL} />
        {categories.map((item, index) => (
          <PartnersListItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PartnersListMenu;
