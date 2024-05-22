'use client';
import { Link, NavBar as NavBarUi } from '@marceloglacial/brinca-ui';
import { FC } from 'react';
import { Logo } from '@/components';
import NextLink from 'next/link';
export interface NavBarUiProps {
  variant?: 'top' | 'bottom';
  items: {
    text: string;
    link: string;
  }[];
}

export const NavBar: FC<NavBarUiProps> = ({
  variant = 'top',
  items,
}): JSX.Element => {
  const componentStyles = variant === 'bottom' ? 'white' : undefined;

  return (
    <NavBarUi variant={variant}>
      <NavBarUi.Brand>
        <NextLink href={'/'}>
          <Logo variant={componentStyles} />
        </NextLink>
      </NavBarUi.Brand>
      <NavBarUi.Items variant={variant}>
        {items?.map((item, index) => {
          return (
            <Link key={index} variant={componentStyles}>
              <a href={item.link}>{item.text}</a>
            </Link>
          );
        })}
      </NavBarUi.Items>
    </NavBarUi>
  );
};
