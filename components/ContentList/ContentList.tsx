import { Button, Heading, Section } from '@marceloglacial/brinca-ui'
import { Card } from 'components'
import { CardComponentProps } from 'components/Card/Card'
import { FC } from 'react'

export interface ContentListProps {
    title: string
    cards?: CardComponentProps[]
}

const ContentList: FC<ContentListProps> = ({
    title,
    cards = [],
}): JSX.Element => {
    const isEmpty = cards.length === 0
    return (
        <Section>
            <Heading>
                <h2>{title}</h2>
            </Heading>
            {isEmpty && (
                <div className='flex justify-center'>
                    <Button variant='secondary' disabled>
                        Sem eventos
                    </Button>
                </div>
            )}
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {cards.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
            </div>
        </Section>
    )
}
export default ContentList
