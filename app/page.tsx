import { Section } from '@marceloglacial/brinca-ui'
import { Card, CardGrid, Hero } from './components'

export default function Home() {
    const imageProps = {
        alt: 'Card Image',
        className: 'w-full h-full object-cover object-top',
        width: 240,
        height: 120,
        src: 'https://res.cloudinary.com/brinca/image/upload/v1681163126/cms/14_rigcwx_e429af051c_7f33d0a168.jpg',
    }

    return (
        <Section spacing='xl'>
            <Hero
                reversed
                rounded
                shadow
                title={'Hero Title'}
                description={
                    'Pariatur culpa aliquip ad nostrud irure ut. Proident sint veniam enim esse laboris consequat magna irure id anim. Culpa fugiat dolor elit eiusmod elit. Do nostrud et nisi ea Lorem non Lorem ipsum esse nulla sint. Sunt cupidatat velit consectetur adipisicing pariatur proident nulla pariatur ut cillum laborum. Ex id ut amet excepteur aute. Commodo in enim cillum do nostrud duis occaecat mollit consequat anim incididunt fugiat.'
                }
                image={imageProps}
                link={{
                    href: '/',
                    text: 'Learn More',
                }}
            />
            <Hero
                rounded
                shadow
                title={'Hero Title'}
                description={
                    'Pariatur culpa aliquip ad nostrud irure ut. Proident sint veniam enim esse laboris consequat magna irure id anim. Culpa fugiat dolor elit eiusmod elit. Do nostrud et nisi ea Lorem non Lorem ipsum esse nulla sint. Sunt cupidatat velit consectetur adipisicing pariatur proident nulla pariatur ut cillum laborum. Ex id ut amet excepteur aute. Commodo in enim cillum do nostrud duis occaecat mollit consequat anim incididunt fugiat.'
                }
                image={imageProps}
                link={{
                    href: '/',
                    text: 'Learn More',
                }}
            />
            <CardGrid title='Card Grid'>
                <Card
                    title={'Title'}
                    description={'Description'}
                    image={imageProps}
                />
                <Card
                    title={'Title'}
                    description={'Description'}
                    image={imageProps}
                />
                <Card
                    title={'Title'}
                    description={'Description'}
                    image={imageProps}
                />
                <Card
                    title={'Title'}
                    description={'Description'}
                    image={imageProps}
                />
                <Card
                    title={'Title'}
                    description={'Description'}
                    image={imageProps}
                />
                <Card
                    title={'Title'}
                    description={'Description'}
                    image={imageProps}
                />
            </CardGrid>
        </Section>
    )
}
