import type { Block } from 'payload'

export const EbookRequestBlock: Block = {
  slug: 'ebookRequestBlock',
  labels: {
    singular: 'Ebook Request Block',
    plural: 'Ebook Request Blocks',
  },
  fields: [
    {
      name: 'downloadUrl',
      type: 'text',
      required: true,
      label: 'Download URL',
      admin: {
        description: 'URL used by the success button to download the ebook.',
      },
    },
    {
      name: 'disclaimerText',
      type: 'textarea',
      localized: true,
      required: true,
      label: 'Disclaimer Text',
      admin: {
        description: 'Localized disclaimer shown below the email field.',
      },
    },
    {
      name: 'consentText',
      type: 'textarea',
      localized: true,
      required: true,
      label: 'Consent Text',
      admin: {
        description: 'Localized text shown next to the optional consent checkbox.',
      },
    },
  ],
}
