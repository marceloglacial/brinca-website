import type { Field } from 'payload'

// Reusable Payload group field for a localized action button
export const buttonGroup = (name = 'button', label = 'Button'): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Full URL (e.g. https://example.com)',
      },
    },
    {
      name: 'openInNewWindow',
      type: 'checkbox',
      label: 'Open in new window',
      defaultValue: false,
    },
  ],
})
