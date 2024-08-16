type ContentType = {
    description: string
    rounded: boolean
    shadow: boolean
    image: ImageProps
    link: { link: string; text: string }
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
