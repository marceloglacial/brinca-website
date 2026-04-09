import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactFormBlock',
  labels: {
    singular: 'Contact Form Block',
    plural: 'Contact Form Blocks',
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
    singularName: 'ContactFormBlock',
  },
}
