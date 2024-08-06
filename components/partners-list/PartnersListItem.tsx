import { FC } from 'react';
import { Link } from '@marceloglacial/brinca-ui';
import NextLink from 'next/link';

const PartnersListItem: FC<PartnersListItemProps> = (props): JSX.Element => {
  return (
    <NextLink href={`#${props.slug[props.locale]}`}>
      <Link size='sm' variant='secondary'>
        {props.title[props.locale]}
      </Link>
    </NextLink>
  );
};

export default PartnersListItem;
