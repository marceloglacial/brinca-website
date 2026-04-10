import type { CollectionConfig } from 'payload'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier', 'year', 'active', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Sponsor Name',
    },
    {
      name: 'logo',
      type: 'text',
      label: 'Logo URL',
      admin: {
        description: 'Paste full Cloudinary or image URL',
      },
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website',
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      label: 'Tier',
      options: [
        { label: 'Diamond', value: 'diamond' },
        { label: 'Silver Premium', value: 'silver' },
        { label: 'Bronze Essential', value: 'bronze' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      label: 'Year',
      defaultValue: () => new Date().getFullYear(),
      admin: {
        position: 'sidebar',
        description: 'Year this sponsorship applies to (e.g. 2026)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
