type ContentListDataType = {
    title: LocalizedString,
    type: string
}

interface ContentListProps {
    language: LocaleTypes;
    type: ContentListDataType.type
    title?: ContentListDataType.title
}
