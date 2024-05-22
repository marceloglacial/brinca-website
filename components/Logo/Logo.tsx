import { FC } from 'react';

export type LogoVariantsType = keyof typeof logoVariants;
export interface LogoProps {
  variant?: LogoVariantsType;
}
const logoVariants = {
  white: (
    <img
      alt=''
      className='w-[150px] h-[60px] object-contain'
      src='https://res.cloudinary.com/brinca/image/upload/v1664060777/brinca-ui/image_yfpt9t.png'
    />
  ),
  default: (
    <img
      alt=''
      className='w-[160px] h-[65px] md:w-[230px] md:h-[95px] object-contain'
      src='https://res.cloudinary.com/brinca/image/upload/v1664060764/brinca-ui/image_qcfpyy.png'
    />
  ),
};

export const Logo: FC<LogoProps> = ({ variant = 'default' }): JSX.Element => {
  return logoVariants[variant];
};
