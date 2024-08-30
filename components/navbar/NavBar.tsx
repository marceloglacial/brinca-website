import { NavBar as NavBarUi } from '@marceloglacial/brinca-ui';
import { FC, Suspense } from 'react';
import { ErrorState, LocaleList, Logo, NavBarItems } from '@/components';
import Link from 'next/link';
import { getMenu } from '@/services';
import { normalizeData } from '@/utils';

export const NavBar: FC<NavBarProps> = async (props): Promise<JSX.Element> => {
  const data = await getMenu(props.locale);

  if ('error' in data) return <ErrorState data={data} />;

  const menu = normalizeData(data);
  const isBottom = props.variant === 'bottom';
  const componentStyles = isBottom ? 'white' : undefined;

  return (
    <NavBarUi variant={props.variant}>
      <NavBarUi.Brand>
        <Link href={'/'} aria-label='Home'>
          <Logo variant={componentStyles} />
        </Link>
      </NavBarUi.Brand>
      <Suspense fallback={<>...</>}>
        <NavBarItems variant={props.variant} items={menu.items} />
      </Suspense>
      {!isBottom && <LocaleList />}
    </NavBarUi>
  );
};
