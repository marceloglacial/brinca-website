import { FC, ReactNode } from 'react'
import { Layout, LinkTypes } from '@marceloglacial/brinca-ui'
import PageFooter from './components/PageFooter'
import PageHeader from './components/PageHeader'
export interface AppLayoutProps {
    children: ReactNode
    navigation: navItem[]
}

export type navItem = {
    id: number
    href: string
    text: string
    type: LinkTypes
}

const AppLayout: FC<AppLayoutProps> = ({
    children,
    navigation,
}): JSX.Element => {
    return (
        <Layout
            header={<PageHeader navigation={navigation} />}
            footer={<PageFooter navigation={navigation} />}
        >
            {children}
        </Layout>
    )
}
export default AppLayout
