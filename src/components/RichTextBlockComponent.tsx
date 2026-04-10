import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  block: {
    blockType: 'richTextBlock'
    content?: any
  }
}

export default function RichTextBlockComponent({ block }: Props) {
  if (!block.content?.root) return null

  return (
    <div className="page-content prose prose-sm md:prose-base max-w-none">
      <RichText data={block.content} converters={defaultJSXConverters} />
    </div>
  )
}
