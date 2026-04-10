import type { Block } from 'payload'

export const SponsorsBlock: Block = {
  slug: 'sponsorsBlock',
  labels: {
    singular: 'Sponsors Block',
    plural: 'Sponsors Blocks',
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      label: 'Year',
      admin: {
        description: 'Leave empty to use the current year',
      },
    },
  ],
}
