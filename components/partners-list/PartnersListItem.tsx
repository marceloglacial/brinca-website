'use client';
import { FC } from 'react';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import { localizedContent } from '@/utils';

const PartnersListItem: FC<CategoryType> = (props): JSX.Element => {
  const params = useParams();

  const category = localizedContent(
    props,
    params.locale as string
  ) as CategoryType;

  const isAll = !params.tag && category.slug === '../';
  const isActive = params.tag === category.slug;
  const categoryVariant =
    isAll || isActive
      ? 'bg-green-600 text-white hover:opacity-75'
      : 'text-green-600 hover:bg-green-600 hover:text-white';

  return (
    <NextLink
      href={`/${params.locale}/${params.slug}/tag/${category.slug}`}
      className={`border-2 border-green-600 rounded-full py-1 px-3 transition-all ease-in-out duration-200 font-normal ${categoryVariant}`}
    >
      {category.title as string}
    </NextLink>
  );
};

export default PartnersListItem;
