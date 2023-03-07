import { FC } from 'react'
import { AppLayout, Block } from 'components'
import { navItem } from 'components/AppLayout/AppLayout'
import { getNavigation } from 'services/data'
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

const Home: FC<HomeProps> = ({ navigation, pageData }): JSX.Element => {
    return (
        <AppLayout navigation={navigation}>
            <div className='flex flex-col gap-24'>
                {pageData?.blocks?.map((block: BlockType, index: number) => (
                    <Block reversed={!(index % 2)} {...block} key={index} />
                ))}
            </div>
        </AppLayout>
    )
}

export async function getStaticProps() {
    const pageData: PageDataType = await getHomePage()
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
