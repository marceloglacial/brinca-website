import { NavBar as NavBarUi } from '@marceloglacial/brinca-ui';
import { FC } from 'react';
import { LocaleList, Logo, NavBarItems } from '@/components';
import Link from 'next/link';
import { getMenu } from '@/services';
import { normalizeData } from '@/utils';

export const NavBar: FC<NavBarProps> = async (props): Promise<JSX.Element> => {
  const menuData = await getMenu(props.locale);
  const menu = normalizeData(menuData);

  const componentStyles = props.variant === 'bottom' ? 'white' : undefined;

  return (
    <NavBarUi variant={props.variant}>
      <NavBarUi.Brand>
        <Link href={'/'} aria-label='Home'>
          <Logo variant={componentStyles} />
        </Link>
      </NavBarUi.Brand>
      <NavBarItems variant={props.variant} items={menu.items} />
      <LocaleList />
    </NavBarUi>
  );
};
