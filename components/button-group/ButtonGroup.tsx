import { FC } from 'react';
import { Link } from '@/components';
import NextLink from 'next/link';

export const ButtonGroup: FC<ButtonGroupProps> = (props): JSX.Element => {
  const buttons = props.content;

  return (
    <div className='button-group flex justify-center gap-4'>
      {buttons.map((button, index) => {
        if (button.new_page)
          return (
            <a key={index} href={button.link.url} target='_blank'>
              <Link variant='primary'>{button.link.title}</Link>
            </a>
          );

        return (
          <NextLink key={index} href={`${button.link.url}`}>
            <Link variant='primary'>{button.link.title}</Link>
          </NextLink>
        );
      })}
    </div>
  );
};
