import type { Block } from 'payload'

export const EventsListBlock: Block = {
  slug: 'eventsListBlock',
  labels: {
    singular: 'Events List Block',
    plural: 'Events List Blocks',
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
      label: 'Max Events',
      defaultValue: 10,
      admin: {
        description: 'Maximum number of events to display (leave empty for all)',
      },
    },
  ],
}
