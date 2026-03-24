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
      ],
    },
  ],
  timestamps: true,
}
