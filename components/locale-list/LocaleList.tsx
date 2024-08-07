import { getDataByType } from '@/services';
import { FC } from 'react';
import { LocaleListItem } from './LocaleListItem';
import { LocaleListItems } from './LocaleListItems';

export const LocaleList: FC = async (): Promise<JSX.Element> => {
  const data = await getDataByType('locales');
  const locales: LocaleListType[] = data.data;

  return (
    <div className='locale-list fixed top-4 -right-8 hover:right-0 transition-all grid grid-cols-2 gap-4 border rounded-full px-4 py-2 bg-white shadow-2xl rounded-tr-none rounded-br-none border-none'>
      <LocaleListItems items={locales} />
    </div>
  );
};
