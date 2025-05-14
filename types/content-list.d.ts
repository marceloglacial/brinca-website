type ContentListDataType = {
  title?: string
  type: CollectionKey
  items_per_page?: number
}

interface ContentListProps {
  data: ContentListDataType
  locale?: LocalesType
}
