import { Hero, Link } from '@marceloglacial/brinca-ui'
import Image, { ImageProps } from 'next/image'
import { FC } from 'react'
import { default as NextLink, LinkProps } from 'next/link'

export interface HeroComponentProps {
    reversed?: boolean
    rounded?: boolean
    shadow?: boolean
    image: ImageProps
    title: string
    description: string
    link: LinkProps & { text: string }
}

const HeroComponent: FC<HeroComponentProps> = ({
    reversed,
    image,
    title,
    description,
    link,
}): JSX.Element => {
    return (
        <Hero reversed={reversed}>
            <Hero.Image rounded shadow className='relative'>
                <Image
                    src={image.src}
                    alt={image?.alt}
                    fill
                    className='w-full h-full object-cover'
                />
            </Hero.Image>
            <Hero.Body>
                <h2>{title}</h2>
                <p>{description}</p>
                <NextLink href={link.href}>
                    <Link variant='secondary'>{link.text}</Link>
                </NextLink>
            </Hero.Body>
        </Hero>
    )
}
export default HeroComponent
