import { FC } from 'react';
import PartnersListItem from './PartnersListItem';
import { getCategories } from '@/services';
import { DICTIONARY, ROUTES } from '@/constants';
import PartnerListTitle from './PartenerListTitle';
import { Alert } from '@/components';
import PartnersListItems from './PartnersListItems';

const PartnersListMenu: FC = async (): Promise<JSX.Element> => {
  const result = await getCategories();

  if (result.status === 'error') {
    return <Alert message={'Error loading categories!'} />;
  }

  const categories = result.data as CategoryType[];
  if (!categories.length) return <></>;

  return (
    <div className='partners-list-categories flex flex-col gap-4'>
      <PartnerListTitle />
      <div className='partners-list-categories__menu flex flex-wrap gap-4'>
        <PartnersListItem
          title={DICTIONARY.ALL}
          slug={ROUTES.PARTNERS_ALL}
          id={'0'}
        />
        <PartnersListItems data={categories} />
      </div>
    </div>
  );
};

export default PartnersListMenu;
