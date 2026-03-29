import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField({ fieldToUse: 'title', localized: true }),
    {
      name: 'thumbnail',
      type: 'text',
      admin: {
        description: 'Paste full Cloudinary image URL (https://res.cloudinary.com/...)',
        position: 'sidebar',
      },
    },
    {
      name: 'showInNavbar',
      type: 'checkbox',
      label: 'Show in Navbar',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'youtube',
      type: 'group',
      fields: [
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'YouTube video URL or ID (paste full URL or the video id)',
          },
        },
      ],
    },
    {
      name: 'cta',
      type: 'array',
      label: 'Call to action buttons',
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      fields: [
        { name: 'title', type: 'text', localized: true, required: false },
        { name: 'url', type: 'text', localized: true, required: false },
        {
          name: 'openInNewWindow',
          type: 'checkbox',
          label: 'Open in new window',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'lists',
      type: 'group',
      fields: [
        {
          name: 'showEvents',
          type: 'checkbox',
          label: 'Show Events List',
          defaultValue: false,
        },
        {
          name: 'showCalendars',
          type: 'checkbox',
          label: 'Show Calendar List',
          defaultValue: false,
        },
        {
          name: 'showPartners',
          type: 'checkbox',
          label: 'Show Partners List',
          defaultValue: false,
        },
      ],
    },
  ],
  timestamps: true,
}
