type ContentListDataType = {
    title: string,
    type: string
}

interface ContentListProps {
    type: ContentListDataType.type
    title?: ContentListDataType.title
}
