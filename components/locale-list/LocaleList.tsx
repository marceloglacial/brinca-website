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
    <div className='locale-list absolute lg:static top-[38px] right-4 flex items-center ml-auto mr-16 lg:m-0 z-0'>
      {props.children}
    </div>
  );
};
