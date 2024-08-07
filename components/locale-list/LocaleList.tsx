import { getDataByType } from '@/services';
import { FC } from 'react';
import { LocaleListItem } from './LocaleListItem';

export const LocaleList: FC = async (): Promise<JSX.Element> => {
  const data = await getDataByType('locales');
  const locales: LocaleListType[] = data.data;

  return (
    <div className='locale-list flex gap-4 justify-center items-center'>
      {locales.map((item, index) => (
        <LocaleListItem key={index} {...item} />
      ))}
    </div>
  );
};
