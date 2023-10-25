import { Layout, Section } from '@marceloglacial/brinca-ui'
import { Hero } from './components'

export default function Home() {
    return (
        <Layout header={<>Header</>} footer={<>Footer</>}>
            <Section spacing='xl'>
                <Hero
                    reversed
                    rounded
                    shadow
                    title={'Hero Title'}
                    description={
                        'Pariatur culpa aliquip ad nostrud irure ut. Proident sint veniam enim esse laboris consequat magna irure id anim. Culpa fugiat dolor elit eiusmod elit. Do nostrud et nisi ea Lorem non Lorem ipsum esse nulla sint. Sunt cupidatat velit consectetur adipisicing pariatur proident nulla pariatur ut cillum laborum. Ex id ut amet excepteur aute. Commodo in enim cillum do nostrud duis occaecat mollit consequat anim incididunt fugiat.'
                    }
                    image={{
                        src: 'https://res.cloudinary.com/brinca/image/upload/v1681163126/cms/14_rigcwx_e429af051c_7f33d0a168.jpg',
                        alt: 'Hero Image',
                    }}
                    link={{
                        href: '/',
                        text: 'Learn More',
                    }}
                />
            </Section>
        </Layout>
    )
}
