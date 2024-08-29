import { FC } from 'react';
import { Block, Motion } from '@/components';

export const Content: FC<ContentProps> = ({ items, locale }): JSX.Element => {
  if (!items.length) return <></>;
  return (
    <>
      {items.map((item: any, index: number) => {
        return (
          <Motion key={index}>
            <Block data={item} locale={locale} />
          </Motion>
        );
      })}
    </>
  );
};
