import type { Block } from 'payload'

export const CalendarsListBlock: Block = {
  slug: 'calendarsListBlock',
  labels: {
    singular: 'Calendars List Block',
    plural: 'Calendars List Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Max Calendars',
      defaultValue: 10,
      admin: {
        description: 'Maximum number of calendar entries to display (leave empty for all)',
      },
    },
  ],
}
