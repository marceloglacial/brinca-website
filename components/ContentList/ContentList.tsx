import { Button, Heading, Section } from '@marceloglacial/brinca-ui'
import { Card } from 'components'
import { CardComponentProps } from 'components/Card/Card'
import Link from 'next/link'
import { FC } from 'react'

export interface ContentListProps {
    title: string
    cards?: cardType[]
}

type cardType = { href: string } & CardComponentProps

const ContentList: FC<ContentListProps> = (props): JSX.Element => {
    const { title, cards = [] } = props
    const isEmpty = cards.length === 0
    return (
        <Section>
            <Heading>
                <h2>{title}</h2>
            </Heading>
            {isEmpty && (
                <div className={styles.containerEmpty}>
                    <Button variant='secondary' disabled>
                        Sem eventos
                    </Button>
                </div>
            )}
            <div className={styles.cardGrid}>
                {cards.map((item, index) => (
                    <Link href={item.href} key={index}>
                        <Card {...item} />
                    </Link>
                ))}
            </div>
        </Section>
    )
}
export default ContentList

const styles = {
    containerEmpty: 'flex justify-center',
    cardGrid: 'grid gap-8 md:grid-cols-2 lg:grid-cols-3',
}
