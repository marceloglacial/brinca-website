'use client';
import { FC } from 'react';
import { Link, LinkProps } from '@marceloglacial/brinca-ui';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';

const PartnersListItem: FC<PartnersListItemProps> = (props): JSX.Element => {
  const params = useParams();
  const linkVariant = params.tag === props.slug ? 'primary' : 'secondary';

  return (
    <NextLink href={`/${params.locale}/${params.slug}/tag/${props.slug}`}>
      <Link size='sm' variant={linkVariant}>
        {props.title}
      </Link>
    </NextLink>
  );
};

export default PartnersListItem;
