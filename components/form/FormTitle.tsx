import { FC } from 'react';
import { Heading } from '@marceloglacial/brinca-ui';

export const FormTitle: FC<FormTitleProps> = ({ title }): JSX.Element => {
  if (!title) return <></>;
  return (
    <Heading>
      <h2>{title}</h2>
    </Heading>
  );
};
