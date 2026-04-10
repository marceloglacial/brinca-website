import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'ctaBlock',
  labels: {
    singular: 'Call to Action Block',
    plural: 'Call to Action Blocks',
  },
  fields: [
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          localized: true,
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
