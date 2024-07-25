import { LinkProps, Link as LinkUI } from '@marceloglacial/brinca-ui';
import { FC } from 'react';

export const Link: FC<LinkProps> = (props): JSX.Element => {
  return <LinkUI {...props}>{props.children}</LinkUI>;
};
