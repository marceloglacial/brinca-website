'use client';
import { FC } from 'react';
import { Link } from '@marceloglacial/brinca-ui';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';

const PartnersListItem: FC<PartnersListItemProps> = (props): JSX.Element => {
  const params = useParams();

  return (
    <NextLink
      href={`/${params.locale}/${params.slug}/tag/${props.slug[props.locale]}`}
    >
      <Link size='sm' variant='secondary'>
        {props.title[props.locale]}
      </Link>
    </NextLink>
  );
};

export default PartnersListItem;
