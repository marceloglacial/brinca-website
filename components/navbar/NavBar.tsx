import { NavBar as NavBarUi } from '@marceloglacial/brinca-ui';
import { FC } from 'react';
import { LocaleList, Logo, NavBarItems } from '@/components';
import Link from 'next/link';

export const NavBar: FC<NavBarUiProps> = ({
  variant = 'top',
  items,
}): JSX.Element => {
  const componentStyles = variant === 'bottom' ? 'white' : undefined;
  return (
    <NavBarUi variant={variant}>
      <NavBarUi.Brand>
        <Link href={'/'} aria-label='Home'>
          <Logo variant={componentStyles} />
        </Link>
      </NavBarUi.Brand>
      <NavBarItems variant={variant} items={items} />
      <LocaleList />
    </NavBarUi>
  );
};
