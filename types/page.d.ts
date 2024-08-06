type PageParamsType = {
    params: {
        slug?: string
        locale: LocaleTypes
        id?: string
    }
}

interface PageProps extends PageParamsType {
    children: React.ReactNode
}

type LocaleTypes = 'en' | 'pt-BR' | 'fr-CA'

type LocalizedString = {
    [k in LocaleTypes]?: string
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
