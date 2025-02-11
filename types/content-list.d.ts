type ContentListDataType = {
    title?: string,
    type: string
    items_per_page?: number
}

interface ContentListProps {
    data: ContentListDataType
    locale?: LocalesType
}
