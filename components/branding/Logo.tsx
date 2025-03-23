import Image from 'next/image'

export type LogoVariantsType = keyof typeof logoVariants
export interface LogoProps {
  variant?: LogoVariantsType
}
const logoVariants = {
  white: (
    <figure className='relative h-[60px] w-[150px]'>
      <Image
        alt='Brinca Logo'
        className='h-full w-full object-contain'
        src='https://res.cloudinary.com/brinca/image/upload/v1739934821/logo-white_o8kkbi.png'
        sizes='150px, 60px'
        priority
        fill
      />
    </figure>
  ),
  default: (
    <figure className='relative h-[65px] w-[160px] md:h-[95px] md:w-[230px]'>
      <Image
        alt='Brinca Logo'
        className='h-full w-full object-contain'
        src='https://res.cloudinary.com/brinca/image/upload/v1664060764/brinca-ui/image_qcfpyy.png'
        sizes='(max-width: 768px) 160px, 230px, 95px'
        priority
        fill
      />
    </figure>
  ),
}

export const Logo = ({ variant = 'default' }: LogoProps) => {
  return logoVariants[variant]
}
