import { FC } from 'react';
import { Link } from '@/components';
import NextLink from 'next/link';

export const LinksGroup: FC<LinksGroupProps> = (props): JSX.Element => {
  return (
    <div className='button-group flex justify-center gap-4'>
      {props.data.items.map((link, index) => {
        return (
          <NextLink key={index} href={`${link.href}`}>
            <Link variant={link.type}>{link.text}</Link>
          </NextLink>
        );
      })}
    </div>
  );
};
