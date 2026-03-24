import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

export const Calendars: CollectionConfig = {
  slug: 'calendars',
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
    // Call-to-action button
    ({
      name: 'cta',
      type: 'group',
      label: 'Call to action',
      fields: [
        { name: 'title', type: 'text', localized: true, required: false },
        { name: 'url', type: 'text', localized: true, required: false },
        { name: 'openInNewWindow', type: 'checkbox', label: 'Open in new window', defaultValue: false },
      ],
    } as any),
  ],
  timestamps: true,
}
