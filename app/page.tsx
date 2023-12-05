import { Section } from '@marceloglacial/brinca-ui'
import { Card, CardGrid, Hero } from './components'
import { API_EVENTS, API_FRONTPAGE_URL } from './constants/api'
import { ImageProps } from 'next/image'
import Link from 'next/link'

async function getData() {
    const res = await fetch(API_FRONTPAGE_URL)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

async function getEvents() {
    const res = await fetch(API_EVENTS)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function Home() {
    const data: RootObject = await getData()
    const events: EventsType = await getEvents()

    const heroes: HeroComponent[] = data.data.attributes.frontpage.filter(
        (item: HeroComponent) => item['__component'] === 'components.hero'
    )
    const contentList: ContentList = data.data.attributes.frontpage.filter(
        (item: ContentList) => item['__component'] === 'components.content-list'
    )[0]

    const imageProps = (image: ImageAttributes): ImageProps => {
        return {
            alt: image.alternativeText || '',
            width: image.width,
            height: image.height,
            src: image.url,
        }
    }

    return (
        <Section spacing='xl'>
            {heroes.map((hero, index) => {
                const isRounded = !(index % 2)
                const image = imageProps(hero.image.data.attributes)

                return (
                    <Hero
                        key={hero.id}
                        reversed={isRounded}
                        rounded={hero.isRounded}
                        shadow={hero.isRounded}
                        title={hero.title}
                        description={hero.description}
                        image={image}
                        link={{
                            href: hero.button.href,
                            text: hero.button.text,
                        }}
                    />
                )
            })}
            <CardGrid title={contentList.title}>
                {events.data
                    .map((item) => {
                        const event = item.attributes
                        const image = imageProps(
                            event.thumbnail.data.attributes
                        )
                        return (
                            <Link
                                href={`/${contentList.type}/${event.slug}`}
                                key={item.id}
                            >
                                <Card title={event.title} image={image} />
                            </Link>
                        )
                    })
                    .splice(contentList.items - 1)}
            </CardGrid>
        </Section>
    )
}
