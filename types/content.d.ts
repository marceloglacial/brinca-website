type ContentType = {
    caption: string
    content: any
    contentType: string
    description: string
    embedType: string
    folderName: string
    id: number,
    image: ImageProps
    items: number
    link: { link: string; text: string }
    rounded: boolean
    shadow: boolean
    title: string
    type: string,
    url: string
}

interface ContentProps {
    locale: string
    items: ContentType[];
}
