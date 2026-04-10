import type { Field } from 'payload'

export const linkFields: Field[] = [
  {
    name: 'linkType',
    type: 'radio',
    label: 'Link Type',
    defaultValue: 'internal',
    options: [
      { label: 'Internal page', value: 'internal' },
      { label: 'External URL', value: 'external' },
    ],
  },
  {
    name: 'internalLink',
    type: 'relationship',
    label: 'Page',
    relationTo: ['pages', 'events', 'calendars'],
    hasMany: false,
    admin: {
      condition: (_, siblings) => siblings?.linkType === 'internal',
    },
  },
  {
    name: 'url',
    type: 'text',
    label: 'URL',
    localized: true,
    admin: {
      condition: (_, siblings) => siblings?.linkType === 'external',
    },
  },
  {
    name: 'openInNewWindow',
    type: 'checkbox',
    label: 'Open in new window',
    defaultValue: false,
  },
]
