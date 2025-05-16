interface ContentProps {
  items: BlockType[]
  locale?: LocalesType
}

type ContentType = {
  id: string
  title: string
  slug: string
  blocks: BlockType[]
}
