import { RichText } from '@payloadcms/richtext-lexical/react'
import { getRichTextConverters } from '@/lib/rich-text'

type Props = {
  block: {
    blockType: 'richTextBlock'
    content?: any
  }
  locale: string
}

export default function RichTextBlockComponent({ block, locale }: Props) {
  if (!block.content?.root) return null

  return (
    <div className="page-content prose prose-sm md:prose-base max-w-none">
      <RichText data={block.content} converters={getRichTextConverters(locale)} />
    </div>
  )
}
