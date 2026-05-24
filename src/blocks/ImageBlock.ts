import type { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'imageBlock',
  labels: {
    singular: 'Image Block',
    plural: 'Image Blocks',
  },
  fields: [
    {
      name: 'imageUrl',
      type: 'text',
      required: true,
      label: 'Image URL',
      admin: {
        description: 'Paste full Cloudinary image URL (https://res.cloudinary.com/...)',
      },
    },
    {
      name: 'width',
      type: 'select',
      required: true,
      defaultValue: 'full',
      label: 'Width',
      options: [
        { label: 'Full width', value: 'full' },
        { label: '50%', value: 'half' },
        { label: 'Original size', value: 'original' },
      ],
    },
  ],
}
