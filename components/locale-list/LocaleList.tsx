import { getDataByType } from '@/services';
import { FC } from 'react';

type LocaleListType = {
  icon: string;
  locale: string;
  title: string;
};

export const LocaleList: FC = async (): Promise<JSX.Element> => {
  const data = await getDataByType('locales');
  const locales: LocaleListType[] = data.data;

  return (
    <div className='locale-list flex gap-4 justify-center items-center'>
      {locales.map((item, index) => (
        <a
          key={index}
          href={`/${item.locale}`}
          title={item.title}
          className='inline-block'
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};
