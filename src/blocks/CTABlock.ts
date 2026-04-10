import type { Block } from 'payload'
import { linkFields } from './fields/linkFields'

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
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Link', value: 'link' },
          ],
        },
        ...linkFields,
      ],
    },
  ],
}
