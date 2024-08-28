'use client';
import { Link, NavBar } from '@marceloglacial/brinca-ui';
import NextLink from 'next/link';
import { FC } from 'react';

export const NavBarItems: FC<NavBarItemsProps> = (props) => {
  const componentStyles = props.variant === 'bottom' ? 'white' : undefined;
  return (
    <NavBar.Items variant={props.variant}>
      {props.items?.map((item, index) => {
        return (
          <Link key={index} variant={componentStyles}>
            <NextLink href={`${item.href}`}>{item.text}</NextLink>
          </Link>
        );
      })}
    </NavBar.Items>
  );
};
