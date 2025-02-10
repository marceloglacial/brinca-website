'use client';

import { FC } from 'react';
import PartnersListItem from './PartnersListItem';
import { useParams } from 'next/navigation';

const PartnersListItems: FC<{ data: CategoryType[] }> = (
  props
): JSX.Element => {
  const params = useParams();
  const locale = params.locale as string;

  const getLocalizedTitle = (title: string | LocalizedString): string => {
    return typeof title === 'string' ? title : title[locale] || '';
  };

  const categories = props.data.sort((a, b) =>
    getLocalizedTitle(a.title).localeCompare(getLocalizedTitle(b.title))
  );

  return (
    <>
      {categories.map((item, index) => (
        <PartnersListItem key={index} {...item} />
      ))}
    </>
  );
};

export default PartnersListItems;
