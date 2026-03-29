import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'active', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Partner Name',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Partner Description',
    },
    {
      name: 'logo',
      type: 'text',
      admin: {
        description: 'Paste full Cloudinary or image URL',
      },
      label: 'Logo URL',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'partner-categories',
      required: true,
      hasMany: false,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp',
        },
        {
          name: 'address',
          type: 'text',
        },
      ],
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
      ],
    },
    {
      name: 'membershipEmail',
      type: 'email',
      label: 'Membership Email',
      admin: {
        description: 'Email registered as a BRINCA member',
      },
    },
  ],
  timestamps: true,
}
