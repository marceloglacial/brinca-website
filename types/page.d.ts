interface PageParamsProps {
    slug?: string
    locale: string
    id?: string
}

interface PageProps {
    children?: React.ReactNode;
    params: PageParamsProps;
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
}
