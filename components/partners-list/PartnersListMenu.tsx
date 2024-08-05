import { FC } from 'react';
import { Link } from '@marceloglacial/brinca-ui';
import NextLink from 'next/link';

const PartnersListMenu: FC<PartnersListMenuProps> = (props): JSX.Element => {
  if (props.items.length === 0) return <></>;

  return (
    <div className='partners-list-categories flex flex-col gap-4'>
      <h4 className='partners-list-categories__title'>
        {props.title[props.locale]}
      </h4>
      <div className='partners-list-categories__menu flex gap-4'>
        {props.items.map((item) => (
          <NextLink key={item.id} href={`${item.slug[props.locale]}`}>
            <Link size='sm' variant='secondary'>
              {item.title[props.locale]}
            </Link>
          </NextLink>
        ))}
      </div>
    </div>
  );
};

export default PartnersListMenu;
