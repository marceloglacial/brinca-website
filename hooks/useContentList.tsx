import { ImageProps } from 'next/image'
import useFetch from './useFetch'
import { API_EVENTS_PARAMS, API_PAGES_PARAMS, API_URL } from 'constants/api'

export interface useContentListApiResponse {
    id: number
    attributes: {
        title: string
        slug: string
        thumbnail: {
            data: {
                attributes: {
                    url: string
                    alternativeText?: string
                    width: number
                    height: number
                }
            }
        }
    }
}

export type ContentTypes = 'events' | 'pages'
type typeUrlType = {
    [key in ContentTypes]: string
}

export type EventType = {
    id: number
    title: string
    url: string
    image: ImageProps
    date?: string
}

const useContentList = (contentType: string) => {
    const typeURL: typeUrlType = {
        events: API_EVENTS_PARAMS,
        pages: API_PAGES_PARAMS,
    }
    const {
        data: events,
        isLoading,
        isError,
    } = useFetch(`${API_URL}/${typeURL[contentType]}`)

    const data: unknown = events?.map((item: useContentListApiResponse) => {
        const { id, attributes } = item
        const image = attributes.thumbnail.data.attributes
        const result: EventType = {
            id,
            title: attributes.title,
            url: `${contentType}/${attributes.slug}`,
            image: {
                src: image.url,
                alt: image.alternativeText || '',
                width: image.width,
                height: image.height,
            },
        }
        return result
    })

    return { data, isLoading, isError }
}

export default useContentList
