import { Card } from '@marceloglacial/brinca-ui'
import Image, { ImageProps } from 'next/image'
import { FC, ReactNode } from 'react'

export interface CardComponentProps {
    title: string
    description?: ReactNode
    image: ImageProps
}

const CardComponent: FC<CardComponentProps> = ({
    title,
    description,
    image,
}): JSX.Element => {
    return (
        <Card className='transition-transform hover:scale-95'>
            <Card.Image>
                <Image {...image} />
            </Card.Image>
            <Card.Body>
                <h4>{title}</h4>
                {description && <p>{description}</p>}
            </Card.Body>
        </Card>
    )
}
export default CardComponent
