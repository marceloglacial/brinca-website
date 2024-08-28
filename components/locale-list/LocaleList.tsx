import { FC, PropsWithChildren } from 'react';
import { LocaleListItems } from './LocaleListItems';
import { getLocales } from '@/services';
import { ErrorState } from '@/components';

export const LocaleList: FC = async (): Promise<JSX.Element> => {
  const data = await getLocales();

  if ('error' in data)
    return (
      <LocaleListContainer>
        <ErrorState />
      </LocaleListContainer>
    );

  return (
    <LocaleListContainer>
      <LocaleListItems items={data} />
    </LocaleListContainer>
  );
};

const LocaleListContainer: FC<PropsWithChildren> = (props) => {
  return (
    <div className='locale-list fixed top-4 -right-8 hover:right-0 transition-all grid grid-cols-2 gap-4 border rounded-full px-4 py-2 bg-white shadow-2xl rounded-tr-none rounded-br-none border-none'>
      {props.children}
    </div>
  );
};
