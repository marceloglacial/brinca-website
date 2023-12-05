import { Card as BrincaCard } from '@marceloglacial/brinca-ui'
import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

export interface CardProps {
    title: string
    description?: string
    image: ImageProps
}
export const Card: FC<CardProps> = ({
    title,
    description,
    image,
}): JSX.Element => {
    return (
        <div className='transition-transform hover:scale-95'>
            <BrincaCard>
                <BrincaCard.Image>
                    <Image
                        alt={image.alt}
                        className='w-full h-full object-cover object-top'
                        width={image.width}
                        height={image.height}
                        src={image.src}
                    />
                </BrincaCard.Image>
                <BrincaCard.Body>
                    <h6>{title}</h6>
                    {description && <p>{description}</p>}
                </BrincaCard.Body>
            </BrincaCard>
        </div>
    )
}
