import type { Block } from 'payload'

export const InstagramBlock: Block = {
  slug: 'instagramBlock',
  labels: {
    singular: 'Instagram Block',
    plural: 'Instagram Blocks',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Instagram Post URL',
    },
  ],
}
