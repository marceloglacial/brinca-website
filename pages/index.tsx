import { FC } from 'react'
import { AppLayout, Block } from 'components'
import { navItem } from 'components/AppLayout/AppLayout'
import { getNavigation } from 'services/data'
import getHomePage from 'services/data/getHomepage'

export interface HomeProps {
    navigation: navItem[]
    pageData: any
}

const Home: FC<HomeProps> = ({ navigation, pageData }): JSX.Element => {
    return (
        <AppLayout navigation={navigation}>
            <div className='flex flex-col gap-24'>
                {pageData?.blocks?.map((block: any, index: number) => (
                    <Block {...block} reversed={!(index % 2)} key={index} />
                ))}
            </div>
        </AppLayout>
    )
}

export async function getStaticProps() {
    const pageData: any = await getHomePage()
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
