import type { CollectionConfig } from 'payload'

export const EbookRequests: CollectionConfig = {
  slug: 'ebook-requests',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'consentGiven', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'E-mail',
    },
    {
      name: 'consentGiven',
      type: 'checkbox',
      defaultValue: false,
      label: 'Consent Given',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Processed', value: 'processed' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
