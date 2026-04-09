import type { Block } from 'payload'

export const MentorSubmissionBlock: Block = {
  slug: 'mentorSubmissionBlock',
  labels: {
    singular: 'Mentor Submission Block',
    plural: 'Mentor Submission Blocks',
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
    singularName: 'MentorSubmissionBlock',
  },
}
