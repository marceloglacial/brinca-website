import { FC } from 'react';
import { Block } from '@/components';

export const Content: FC<ContentProps> = ({ items, locale }): JSX.Element => {
  if (!items.length) return <></>;

  return (
    <>
      {items.map((item: any, index: number) => {
        return <Block key={index} content={item} locale={locale} />;
      })}
    </>
  );
};
