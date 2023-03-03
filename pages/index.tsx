import { FC } from 'react'
import { AppLayout } from 'components'
import { navItem } from 'components/AppLayout/AppLayout'
import { getNavigation } from 'services/data'

export interface HomeProps {
    navigation: navItem[]
}

const Home: FC<HomeProps> = ({ navigation }): JSX.Element => {
    return <AppLayout navigation={navigation}>Home</AppLayout>
}

export async function getStaticProps() {
    const pageData: any = []
    const navigation: navItem[] = await getNavigation()
    return {
        props: {
            pageData,
            navigation,
        },
        revalidate: 30,
    }
}

export default Home
