'use client';
import { FC, useState } from 'react';
import { LocaleListItem } from './LocaleListItem';
import { useParams } from 'next/navigation';

export const LocaleListItems: FC<LocaleListItemsProps> = (
  props
): JSX.Element => {
  const locales = props.items;
  const params = useParams();
  const selectedLocale = locales.find(
    (locale) => locale.code === params.locale
  );
  const remainLocales = locales.filter(
    (locale) => locale.code !== params.locale
  );

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button className='relative flex items-center z-40' onClick={handleClick}>
        {selectedLocale && <LocaleListItem {...selectedLocale} />}
      </button>
      <div
        className={`${
          isOpen ? ' opacity-100 top-[100%]' : 'opacity-0 top-0'
        } absolute transition-all ease-in-out duration-300 z-0`}
      >
        {remainLocales.map((item, index) => (
          <LocaleListItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
