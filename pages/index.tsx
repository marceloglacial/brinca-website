import { FC } from 'react'
import { AppLayout, Blocks } from 'components'
import { navItem } from 'components/AppLayout/AppLayout'
import { getNavigation } from 'services/data'
import getHomePage from 'services/data/getHomepage'

export interface HomeProps {
    navigation: navItem[]
    pageData: PageDataType
}

export type PageDataType = {
    blocks: any[] // TODO: add proper type
}

const Home: FC<HomeProps> = ({ navigation, pageData }): JSX.Element => {
    return (
        <AppLayout navigation={navigation}>
            <Blocks blocks={pageData.blocks} spacing='lg' />
        </AppLayout>
    )
}

export async function getStaticProps() {
    const pageData = await getHomePage()
    const navigation = await getNavigation()
    return {
        props: {
            pageData,
            navigation,
        },
        revalidate: 30,
    }
}

export default Home
