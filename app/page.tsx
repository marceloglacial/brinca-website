import { Section } from '@marceloglacial/brinca-ui'
import { Card, CardGrid, Hero } from './components'
import { API_FRONTPAGE_URL } from './constants/api'

async function getData() {
    const res = await fetch(API_FRONTPAGE_URL)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function Home() {
    const data: RootObject = await getData()

    const heroes: HeroComponent[] = data.data.attributes.frontpage.filter(
        (item) => item['__component'] === 'components.hero'
    )

    const imageProps = {
        alt: 'Card Image',
        className: 'w-full h-full object-cover object-top',
        width: 240,
        height: 120,
        src: 'https://res.cloudinary.com/brinca/image/upload/v1681163126/cms/14_rigcwx_e429af051c_7f33d0a168.jpg',
    }

    return (
        <Section spacing='xl'>
            {heroes.map((hero, index) => {
                const isRounded = !(index % 2)
                const imageProps = hero.image.data.attributes

                return (
                    <Hero
                        key={hero.id}
                        reversed={isRounded}
                        rounded={hero.isRounded}
                        shadow={hero.isRounded}
                        title={hero.title}
                        description={hero.description}
                        image={{
                            alt: imageProps.alternativeText || '',
                            width: imageProps.width,
                            height: imageProps.height,
                            src: imageProps.url,
                        }}
                        link={{
                            href: hero.button.href,
                            text: hero.button.text,
                        }}
                    />
                )
            })}
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
