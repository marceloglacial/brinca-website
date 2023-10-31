import { Hero as HeroBrinca, Link } from '@marceloglacial/brinca-ui'
import Image, { ImageProps } from 'next/image'
import { FC } from 'react'
import { default as NextLink, LinkProps } from 'next/link'

export interface HeroProps {
    reversed?: boolean
    rounded?: boolean
    shadow?: boolean
    image: ImageProps
    title: string
    description: string
    link: LinkProps & { text: string }
}

export const Hero: FC<HeroProps> = ({
    reversed,
    image,
    title,
    description,
    link,
    rounded,
}): JSX.Element => {
    return (
        <HeroBrinca reversed={reversed}>
            <HeroBrinca.Image rounded={rounded} shadow={rounded}>
                <Image
                    src={image.src}
                    alt={image?.alt}
                    width={640}
                    height={320}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 50vw'
                    className='w-full h-full object-cover'
                    priority={true}
                />
            </HeroBrinca.Image>
            <HeroBrinca.Body>
                <h2>{title}</h2>
                <p>{description}</p>
                <div>
                    <NextLink href={link.href}>
                        <Link variant='secondary'>{link.text}</Link>
                    </NextLink>
                </div>
            </HeroBrinca.Body>
        </HeroBrinca>
    )
}
