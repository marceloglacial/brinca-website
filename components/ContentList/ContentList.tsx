import { Heading, Section } from '@marceloglacial/brinca-ui'
import { FC } from 'react'

export interface ContentListProps {
    title: string
}

const ContentList: FC<ContentListProps> = ({ title }): JSX.Element => {
    return (
        <Section>
            <Heading>
                <h2>{title}</h2>
            </Heading>
        </Section>
    )
}
export default ContentList
