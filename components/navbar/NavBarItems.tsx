'use client';
import { Link, NavBar } from '@marceloglacial/brinca-ui';
import NextLink from 'next/link';
import { FC } from 'react';

export const NavBarItems: FC<NavBarUiProps> = ({ variant, items }) => {
  const componentStyles = variant === 'bottom' ? 'white' : undefined;
  return (
    <NavBar.Items variant={variant}>
      {items?.map((item, index) => {
        return (
          <Link key={index} variant={componentStyles}>
            <NextLink href={`/${item.link}`}>{item.text}</NextLink>
          </Link>
        );
      })}
    </NavBar.Items>
  );
};
