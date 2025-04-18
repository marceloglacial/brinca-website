type CardGridItemType = {
  id: string | number
  link: string
  slug: string
  image: string
  title: string
  content?: string
  date?: string
}

interface CardGridProps {
  title?: string
  items: CardGridItemType[]
  locale?: LocalesType
}
