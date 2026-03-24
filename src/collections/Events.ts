import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
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
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        description: 'Event date (non-localized)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Event description (localized rich text)',
      },
    },
    {
      name: 'gallery',
      type: 'group',
      fields: [
        {
          name: 'cloudinaryFolder',
          type: 'text',
          admin: {
            description: 'Paste the Cloudinary folder path for this event gallery.',
          },
        },
      ],
    },
    {
      name: 'instagram',
      type: 'group',
      fields: [
        {
          name: 'InstagramEmbed',
          type: 'text',
          admin: {
            description: 'Paste the instagram link.',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
