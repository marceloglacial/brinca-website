import { FC, ReactNode } from 'react'
import { Layout } from '@marceloglacial/brinca-ui'
import PageFooter from './components/PageFooter'
import PageHeader from './components/PageHeader'
export interface AppLayoutProps {
    children: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children }): JSX.Element => {
    return (
        <Layout header={<PageHeader />} footer={<PageFooter />}>
            {children}
        </Layout>
    )
}
export default AppLayout
