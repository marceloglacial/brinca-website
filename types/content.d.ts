type ContentType = {
    caption: string
    content: any
    contentType: string
    embedType: string
    id: number,
    title: string
    type: string,
    url: string
    items: number
}

interface ContentProps {
    locale: string
    items: ContentType[];
}
