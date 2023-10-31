import { Heading, Link, Section } from '@marceloglacial/brinca-ui'
import { FC } from 'react'

interface CardGridProps {
    children: React.ReactNode
    title: string
}

export const CardGrid: FC<CardGridProps> = ({
    children,
    title,
}): JSX.Element => {
    return (
        <Section spacing='l'>
            <Heading>
                <h2>{title}</h2>
            </Heading>
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {children}
            </div>
            <div className='text-center'>
                <Link variant='primary'>Minim Labore</Link>
            </div>
        </Section>
    )
}
