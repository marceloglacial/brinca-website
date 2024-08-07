import { FC } from 'react';
import PartnersListItem from './PartnersListItem';
import { getDataByType } from '@/services';
import { sortArray } from '@/utils';

const PartnersListMenu: FC<PartnersListMenuProps> = async (
  props
): Promise<JSX.Element> => {
  const title: LocalizedString = { en: 'Categories', 'pt-BR': 'Categorias' };
  const data = await getDataByType('partnersCategory');
  const items: PartnerCategoryType[] = sortArray(
    data.data,
    `title.${props.locale}`,
    'asc'
  );

  if (items.length === 0) return <></>;

  return (
    <div className='partners-list-categories flex flex-col gap-4'>
      <h4 className='partners-list-categories__title'>{title[props.locale]}</h4>
      <div className='partners-list-categories__menu flex flex-wrap gap-4'>
        {items.map((item) => (
          <PartnersListItem key={item.id} {...item} locale={props.locale} />
        ))}
      </div>
    </div>
  );
};

export default PartnersListMenu;
