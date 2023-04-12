import { API_EVENTS_PARAMS, API_URL } from 'constants/api'
import { ImageProps } from 'next/image'

export type EventType = {
    id: number
    title: string
    url: string
    image: ImageProps
    date?: string
}

const getEvents = async () => {
    const results = await fetch(`${API_URL}/${API_EVENTS_PARAMS}`)
    const event = await results.json()
    const eventAttributes = event.data
    return eventAttributes.map((item: any) => {
        const { id, attributes } = item
        const image = attributes.thumbnail.data.attributes
        const result: EventType = {
            id,
            title: attributes.title,
            url: attributes.slug,
            image: {
                ...image,
                src: image.url,
                alt: image.alternativeText || '',
            },
        }
        return result
    })
}

export default getEvents
