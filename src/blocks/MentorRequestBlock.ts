import type { Block } from 'payload'

export const MentorRequestBlock: Block = {
  slug: 'mentorRequestBlock',
  labels: {
    singular: 'Mentor Request Block',
    plural: 'Mentor Request Blocks',
  },
  fields: [
    {
      name: 'introText',
      type: 'richText',
      label: 'Intro Text',
      localized: true,
      admin: {
        description: 'Optional intro content to display above the form (supports localization)',
      },
    },
  ],
  graphQL: {
    singularName: 'MentorRequestBlock',
  },
}
