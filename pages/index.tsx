import { FC } from 'react'
import { AppLayout, Blocks, ContentList } from 'components'
import { navItem } from 'components/AppLayout/AppLayout'
import { getEvents, getNavigation } from 'services/data'
import getHomePage from 'services/data/getHomepage'
import { HeroComponentProps } from 'components/Hero/Hero'

export interface HomeProps {
    navigation: navItem[]
    pageData: PageDataType
}

export type PageDataType = {
    blocks: BlockType[]
}
export type BlockType = HeroComponentProps

const Home: FC<HomeProps> = ({ navigation, pageData, events }): JSX.Element => {
    console.log(events)

    return (
        <AppLayout navigation={navigation}>
            <Blocks blocks={pageData.blocks} spacing='lg' />
            <ContentList cards={[]} title={'Eventos'} />
        </AppLayout>
    )
}

export async function getStaticProps() {
    const pageData = await getHomePage()
    const navigation = await getNavigation()
    const events = await getEvents()
    return {
        props: {
            pageData,
            navigation,
            events,
        },
        revalidate: 30,
    }
}

export default Home
