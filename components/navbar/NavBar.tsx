'use client';
import { Link, NavBar as NavBarUi } from '@marceloglacial/brinca-ui';
import { FC } from 'react';
import { Logo } from '@/components';
import NextLink from 'next/link';
export interface NavBarUiProps {
  variant?: 'top' | 'bottom';
}

export const NavBar: FC<NavBarUiProps> = ({ variant = 'top' }): JSX.Element => {
  const componentStyles = variant === 'bottom' ? 'white' : undefined;

  return (
    <NavBarUi variant={variant}>
      <NavBarUi.Brand>
        <NextLink href={'/'}>
          <Logo variant={componentStyles} />
        </NextLink>
      </NavBarUi.Brand>
      <NavBarUi.Items variant={variant}>
        <Link variant={componentStyles}>
          <a href='#'>Item</a>
        </Link>
        <Link variant={componentStyles}>
          <a href='#'>Item</a>
        </Link>
        <Link variant={componentStyles}>
          <a href='#'>Item</a>
        </Link>
        <Link variant={componentStyles}>
          <a href='#'>Item</a>
        </Link>
        <Link variant={componentStyles}>
          <a href='#'>Item</a>
        </Link>
      </NavBarUi.Items>
    </NavBarUi>
  );
};
