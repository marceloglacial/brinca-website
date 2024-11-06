type PageParamsType = {
    params: {
        slug?: string
        locale: LocaleTypes
        id?: string
        tag?: string
    }
}

interface PageProps extends PageParamsType {
    children: React.ReactNode
}

type LocaleTypes = 'en' | 'pt_br'

type LocalizedString = {
    [k in LocaleTypes]: string
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
