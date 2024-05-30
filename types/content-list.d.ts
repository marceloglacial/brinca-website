type ContentListDataType = {
    title: LocalizedString,
    type: string
}

interface ContentListProps {
    language: string;
    type: ContentListDataType.type
    title?: ContentListDataType.title
}
