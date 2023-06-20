import { FC } from 'react'
import { Button, Heading, Section } from '@marceloglacial/brinca-ui'
import { Card } from 'components'
import useContentList, {
    contentType,
    useContentListItemType,
} from 'hooks/useContentList'
import Link from 'next/link'

export interface ContentListProps {
    title: string
    contentType: contentType
}

const ContentList: FC<ContentListProps> = (props): JSX.Element => {
    const { title, contentType } = props

    const { data, isLoading, isError } = useContentList(contentType)

    if (isLoading) return <div>...</div>
    if (isError) return <div>Error</div>
    const items = data
    const isEmpty = items?.length === 0

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
                {items.map((item: useContentListItemType) => (
                    <Link href={item?.link} key={item.id}>
                        <Card title={item.title} image={item.image} />
                    </Link>
                ))}
            </div>
        </Section>
    )
}
export default ContentList
