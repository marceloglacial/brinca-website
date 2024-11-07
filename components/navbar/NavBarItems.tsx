'use client';
import { Link, NavBar } from '@marceloglacial/brinca-ui';
import NextLink from 'next/link';
import { FC } from 'react';

export const NavBarItems: FC<NavBarUiProps> = ({ variant, items }) => {
  return (
    <NavBar.Items variant={variant}>
      {items?.map((item, index) => {
        const linkType = item.type === 'link' ? undefined : item.type;
        const componentStyles = variant === 'bottom' ? 'white' : linkType;
        return (
          <Link key={index} variant={componentStyles}>
            <NextLink href={`/${item.slug}`}>{item.title}</NextLink>
          </Link>
        );
      })}
    </NavBar.Items>
  );
};
