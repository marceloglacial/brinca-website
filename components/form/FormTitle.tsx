import { FC, PropsWithChildren } from 'react';
import { Heading } from '@marceloglacial/brinca-ui';

export const FormTitle: FC<PropsWithChildren> = (props): JSX.Element => {
  return (
    <Heading>
      <h2>{props.children}</h2>
    </Heading>
  );
};
