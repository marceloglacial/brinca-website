import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description',
    },
    {
      name: 'image',
      type: 'text',
      label: 'Image URL',
      admin: {
        description: 'Paste full Cloudinary or image URL',
      },
    },
    {
      name: 'direction',
      type: 'radio',
      label: 'Image Direction',
      defaultValue: 'right',
      options: [
        { label: 'Image on the left', value: 'left' },
        { label: 'Image on the right', value: 'right' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          label: 'Button Label',
        },
        {
          name: 'url',
          type: 'text',
          localized: true,
          label: 'Button URL',
        },
        {
          name: 'openInNewWindow',
          type: 'checkbox',
          label: 'Open in new window',
          defaultValue: false,
        },
      ],
    },
  ],
}
