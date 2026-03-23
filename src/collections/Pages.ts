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
  ],
  timestamps: true,
}
