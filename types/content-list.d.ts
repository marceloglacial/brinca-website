type ContentListDataType = {
    title?: string,
    type: string
}

interface ContentListProps {
    data: ContentListDataType
    locale?: LocalesType
}
