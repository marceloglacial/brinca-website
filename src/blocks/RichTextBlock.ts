import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  labels: {
    singular: 'Rich Text Block',
    plural: 'Rich Text Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
  ],
}
