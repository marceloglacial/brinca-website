interface ContentProps {
  items?: Block[]
  locale?: LocalesType
}

type ContentType = {
  id: string
  title: string
  slug: string
  blocks: BlockType[]
}
