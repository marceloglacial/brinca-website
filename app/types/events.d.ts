type EventType = {
    id: number
    attributes: {
        title: string
        slug: string
        date: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        locale: string
        content: ContentType[]
        thumbnail: ThumbnailType
    }
}

type ContentType = {
    id: number
    __component: string
    content: string
}

type ThumbnailType = {
    data: {
        id: number
        attributes: ImageAttributes
    }
}

type EventsType = {
    data: EventType[]
}
