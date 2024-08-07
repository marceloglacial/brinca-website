import Image from 'next/image';
import { FC } from 'react';

export type LogoVariantsType = keyof typeof logoVariants;
export interface LogoProps {
  variant?: LogoVariantsType;
}
const logoVariants = {
  white: (
    <figure className='w-[150px] h-[60px] relative'>
      <Image
        alt='Brinca Logo'
        className='w-full h-full object-contain'
        src='https://res.cloudinary.com/brinca/image/upload/v1664060777/brinca-ui/image_yfpt9t.png'
        sizes='150px, 60px'
        priority
        fill
      />
    </figure>
  ),
  default: (
    <figure className='w-[160px] h-[65px] md:w-[230px] md:h-[95px] relative'>
      <Image
        alt='Brinca Logo'
        className='w-full h-full object-contain'
        src='https://res.cloudinary.com/brinca/image/upload/v1664060764/brinca-ui/image_qcfpyy.png'
        sizes='(max-width: 768px) 160px, 230px, 95px'
        priority
        fill
      />
    </figure>
  ),
};

export const Logo: FC<LogoProps> = ({ variant = 'default' }): JSX.Element => {
  return logoVariants[variant];
};
