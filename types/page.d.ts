type PageParamsType = {
  params: Promise<{
    slug: string
    locale: LocaleTypes
    id: string
    tag: string
  }>
}

interface PageProps extends PageParamsType {
  children: React.ReactNode
}
interface IPageData {
  createdAt: Timestamp
  updatedAt: Timestamp
  publishedAt: Timestamp
  id: string
  title: LocalizedString
  slug: LocalizedString
  content: ContentType[]
  image: HTMLImageElement
  date?: string
}
