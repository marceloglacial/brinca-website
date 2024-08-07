'use client';
import { FC } from 'react';
import { LocaleListItem } from './LocaleListItem';
import { useParams } from 'next/navigation';

interface LocaleListItemsProps {
  items: LocaleListType[];
}

export const LocaleListItems: FC<LocaleListItemsProps> = (
  props
): JSX.Element => {
  const locales = props.items;
  const params = useParams();
  const selectedLocale = locales.find(
    (locale) => locale.locale === params.locale
  );
  const remainLocales = locales.filter(
    (locale) => locale.locale !== params.locale
  );

  const styles = `locale-list fixed bottom-[50%] -right-${
    remainLocales.length * 12
  } hover:right-0 transition-all flex gap-4 px-4 py-2 bg-white shadow-2xl border border-r-none rounded-full rounded-tr-none rounded-br-none`;

  return (
    <div className={styles}>
      {selectedLocale && <LocaleListItem {...selectedLocale} />}
      {remainLocales.map((item, index) => (
        <LocaleListItem key={index} {...item} />
      ))}
    </div>
  );
};
