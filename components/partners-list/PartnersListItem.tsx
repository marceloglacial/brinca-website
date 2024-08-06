'use client';
import { FC } from 'react';
import { Link } from '@marceloglacial/brinca-ui';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

const PartnersListItem: FC<PartnersListItemProps> = (props): JSX.Element => {
  const pathname = usePathname();
  return (
    <NextLink href={`${pathname}/${props.slug[props.locale]}`}>
      <Link size='sm' variant='secondary'>
        {props.title[props.locale]}
      </Link>
    </NextLink>
  );
};

export default PartnersListItem;
