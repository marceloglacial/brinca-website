import { Card } from '@marceloglacial/brinca-ui'
import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

interface CardComponentProps {
    title: string
    description: string
    image: ImageProps
}
const CardComponent: FC<CardComponentProps> = ({
    title,
    description,
    image,
}) => {
    return (
        <div className='transition-transform hover:scale-95'>
            <Card>
                <Card.Image>
                    <Image
                        alt={image.alt}
                        className='w-full h-full object-cover object-top'
                        width={image.width}
                        height={image.height}
                        src={image.src}
                    />
                </Card.Image>
                <Card.Body>
                    <h4>{title}</h4>
                    <p>{description}</p>
                </Card.Body>
            </Card>
        </div>
    )
}
export default CardComponent
