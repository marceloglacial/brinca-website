import { FC } from 'react';
import { Block } from '@/components';

export const Content: FC<ContentProps> = ({ items, language }): JSX.Element => {
  if (!items.length) return <></>;
  return (
    <>
      {items.map((item: any) => {
        return (
          <Block key={item.id} blockContent={item} blockLanguage={language} />
        );
      })}
    </>
  );
};
