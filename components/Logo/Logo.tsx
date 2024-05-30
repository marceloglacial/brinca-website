import Image from 'next/image';
import { FC } from 'react';

export type LogoVariantsType = keyof typeof logoVariants;
export interface LogoProps {
  variant?: LogoVariantsType;
}
const logoVariants = {
  white: (
    <Image
      alt=''
      className='w-[150px] h-[60px] object-contain'
      src='https://res.cloudinary.com/brinca/image/upload/v1664060777/brinca-ui/image_yfpt9t.png'
      width={150}
      height={60}
    />
  ),
  default: (
    <Image
      alt=''
      className='w-[160px] h-[65px] md:w-[230px] md:h-[95px] object-contain'
      src='https://res.cloudinary.com/brinca/image/upload/v1664060764/brinca-ui/image_qcfpyy.png'
      width={169}
      height={65}
    />
  ),
};

export const Logo: FC<LogoProps> = ({ variant = 'default' }): JSX.Element => {
  return logoVariants[variant];
};
