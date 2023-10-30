import { Heading, Link, Section } from '@marceloglacial/brinca-ui'
import { FC } from 'react'

interface CardGridProps {
    children: React.ReactNode
    title: string
}

const CardGrid: FC<CardGridProps> = ({ children, title }) => {
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
export default CardGrid
