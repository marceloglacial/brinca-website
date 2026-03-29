import type { Block } from 'payload'

export const PartnerSubmissionBlock: Block = {
  slug: 'partnerSubmissionBlock',
  labels: {
    singular: 'Partner Submission Block',
    plural: 'Partner Submission Blocks',
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
    singularName: 'PartnerSubmissionBlock',
  },
}
