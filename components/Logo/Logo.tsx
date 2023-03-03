import Image from 'next/image'
import { FC } from 'react'

export interface LogoProps {
    variant?: 'default' | 'white'
}

const Logo: FC<LogoProps> = ({ variant = 'default' }): JSX.Element => {
    const logoSrc = {
        default:
            'https://res.cloudinary.com/brinca/image/upload/v1664060764/brinca-ui/image_qcfpyy.png',
        white: 'https://res.cloudinary.com/brinca/image/upload/v1664060777/brinca-ui/image_yfpt9t.png',
    }
    return <Image src={logoSrc[variant]} alt='' fill />
}
export default Logo
