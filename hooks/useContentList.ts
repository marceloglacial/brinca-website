import useSWR from 'swr'
import { fetcher } from 'services/data'
import {
    API_EVENTS_PARAMS,
    API_EVENTS_ROUTE,
    API_PAGES_PARAMS,
    API_PAGES_ROUTE,
    API_URL,
} from 'constants/api'
import { CardComponentProps } from 'components/Card/Card'

export type contentType = 'pages' | 'events'
export type useContentListItemType = {
    id: number
    link: string
} & CardComponentProps

export type useContentListResponse = {
    data: useContentListItemType[]
    isLoading: boolean
    isError: boolean
    isLastPage: boolean
}

const useContentList = (type: contentType): useContentListResponse => {
    const contentUrl = {
        pages: API_PAGES_PARAMS,
        events: API_EVENTS_PARAMS,
    }
    const contentLink = {
        pages: API_PAGES_ROUTE,
        events: API_EVENTS_ROUTE,
    }

    const { data, error } = useSWR(`${API_URL}/${contentUrl[type]}`, fetcher)
    const events = data?.data.map((item: any) => {
        const event = item.attributes
        const thumbnail = event.thumbnail?.data?.attributes
        const result: useContentListItemType = {
            id: item.id,
            title: event.title,
            image: {
                src: thumbnail.url,
                alt: thumbnail.alternativeText || '',
                width: thumbnail?.width || 320,
                height: thumbnail?.height || 240,
            },
            link: `${contentLink[type]}/${event.slug}`,
        }
        return result
    })
    return {
        data: events,
        isLoading: !error && !data,
        isError: error,
        isLastPage: data?.data?.status,
    }
}
export default useContentList
