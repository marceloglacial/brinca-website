/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageProps } from 'next/image'
import useFetch from './useFetch'
import { API_EVENTS_PARAMS, API_PAGES_PARAMS, API_URL } from 'constants/api'

// Define the type for the data you expect from the API
// interface ApiResponse {
// Add properties based on the response from your API
// For example:
// id: number;
// name: string;
// ...
// }

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
    const data = events?.map((item: any) => {
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
