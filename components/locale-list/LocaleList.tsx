import { FC } from 'react';
import { LocaleListItems } from './LocaleListItems';
import { getPageDataBySlug } from '@/services';

export const LocaleList: FC = async (): Promise<JSX.Element> => {
  const data = await getPageDataBySlug('locales');

  if (data.status === 'error') {
    console.error(`Error: ${data.message}`);
    return <></>;
  }

  return (
    <div className='locale-list fixed top-4 -right-8 hover:right-0 transition-all grid grid-cols-2 gap-4 border rounded-full px-4 py-2 bg-white shadow-2xl rounded-tr-none rounded-br-none border-none'>
      <LocaleListItems items={data.data} />
    </div>
  );
};
