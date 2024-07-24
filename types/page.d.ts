type PageParamsType = {
    params: {
        slug?: string
        locale: string
        id?: string
    }
}

interface PageProps extends PageParamsType {
    children: React.ReactNode
}

type LocalizedString = {
    [k: string]: string
}

interface IPageData {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    publishedAt: Timestamp;
    id: string;
    title: LocalizedString;
    slug: LocalizedString;
    content: ContentType[];
    image: HTMLImageElement
    date?: string
}
