import Image from 'next/image'
import { FC } from 'react'

export type LogoVariant = 'default' | 'white'
export type LogoSize = 'large' | 'small'

export interface LogoProps {
    variant?: LogoVariant
    size?: LogoSize
}

export type LogoSrcProps = {
    [K in LogoVariant]: string
}

export const Logo: FC<LogoProps> = ({
    variant = 'default',
    size = 'large',
}): JSX.Element => {
    const logoSrc: LogoSrcProps = {
        default:
            'https://res.cloudinary.com/brinca/image/upload/v1664060764/brinca-ui/image_qcfpyy.png',
        white: 'https://res.cloudinary.com/brinca/image/upload/v1664060777/brinca-ui/image_yfpt9t.png',
    }

    const logoSizes: { [K in LogoSize]: string } = {
        large: 'w-[160px] h-[65px] md:w-[230px] md:h-[95px]',
        small: 'w-[150px] h-[60px] ',
    }

    return (
        <Image
            alt=''
            width={150}
            height={60}
            className={logoSizes[size]}
            src={logoSrc[variant]}
        />
    )
}
