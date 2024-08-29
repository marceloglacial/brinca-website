import { FC } from 'react';
import { NavBar } from '@/components';

interface FooterProps {
  locale: LocaleTypes;
}
export const Footer: FC<FooterProps> = (props): JSX.Element => {
  const menu = [
    {
      text: 'Developed by Marcelo Glacial',
      href: 'https://github.com/marceloglacial',
      target: '_blank',
    },
    {
      text: 'User Login',
      href: '/login',
      target: '_blank',
    },
  ];

  return (
    <>
      <NavBar locale={props.locale} variant='bottom' />
      <div className='footer--secondary'>
        <ul className='footer--secondary__menu flex list-none lowercase text-sm justify-center p-4 gap-8'>
          <li>Copyrights Brinca - {new Date().getFullYear()}</li>
          {menu.map((item, index) => (
            <li key={index}>
              <a href={item.href} target={item.target}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
