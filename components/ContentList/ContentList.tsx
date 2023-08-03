import { Card } from 'components'
import { CardComponentProps } from 'components/Card/Card'
import { ContentTypes } from 'hooks/useContentList'
import { FC } from 'react'
import { Button, Heading, Section } from '@marceloglacial/brinca-ui'
import { useContentList } from 'hooks'
import Link from 'next/link'

export interface ContentListProps {
    title: string
    items: number
    contentType: ContentTypes
}

type cardType = { url: string } & CardComponentProps

const ContentList: FC<ContentListProps> = (props): JSX.Element => {
    const { title, contentType, items } = props
    const { data, isLoading, isError } = useContentList(contentType)
    const cards: cardType[] = data?.slice(0, items)
    const isEmpty = cards?.length === 0

    return (
        <Section>
            <Heading>
                <h2>{title}</h2>
            </Heading>
            {isLoading && (
                <div className={styles.centered}>
                    <Button variant='secondary' disabled>
                        Carregando ...
                    </Button>
                </div>
            )}
            {isError && (
                <div className={styles.centered}>
                    <Button variant='secondary' disabled>
                        Ocorreu um erro inesperado
                    </Button>
                </div>
            )}
            {isEmpty && (
                <div className={styles.centered}>
                    <Button variant='secondary' disabled>
                        Nada encontrado
                    </Button>
                </div>
            )}
            {!isEmpty && (
                <div className={styles.cardGrid}>
                    {cards?.map((item, index) => (
                        <Link href={item.url} key={index}>
                            <Card {...item} />
                        </Link>
                    ))}
                </div>
            )}
        </Section>
    )
}
export default ContentList

const styles = {
    cardGrid: 'grid gap-8 md:grid-cols-2 lg:grid-cols-3',
    centered: 'flex items-center justify-center',
}
