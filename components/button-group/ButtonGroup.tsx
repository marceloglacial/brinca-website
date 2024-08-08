import { FC } from 'react';
import { Link } from '@/components';
import NextLink from 'next/link';

export const ButtonGroup: FC<ButtonGroupProps> = (props): JSX.Element => {
  const buttons = props.content.data;
  console.log(props);

  return (
    <div className='button-group flex justify-center gap-4'>
      {buttons.map((button, index) => {
        console.log();

        return (
          <NextLink key={index} href={`/${button.link[props.locale]}`}>
            <Link variant='primary'>{button.title[props.locale]}</Link>
          </NextLink>
        );
      })}
    </div>
  );
};
