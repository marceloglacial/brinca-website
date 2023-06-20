import { Card } from '@marceloglacial/brinca-ui'
import Image, { ImageProps } from 'next/image'
import { FC, ReactNode } from 'react'
import styles from './CardStyles'

export interface CardComponentProps {
    title: string
    description?: ReactNode
    image?: ImageProps
}

const CardComponent: FC<CardComponentProps> = ({
    title,
    description,
    image,
}): JSX.Element => {
    return (
        <Card className='transition-transform hover:scale-95'>
            {image && (
                <Card.Image>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        className={styles.image}
                    />
                </Card.Image>
            )}
            <Card.Body>
                <h4>{title}</h4>
                {description && <p>{description}</p>}
            </Card.Body>
        </Card>
    )
}
export default CardComponent
