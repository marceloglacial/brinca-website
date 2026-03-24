import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'
import { normalizeCTAValue } from '@/lib/normalizeCta'

export const Events: CollectionConfig = {
  slug: 'events',
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && typeof data === 'object' && 'cta' in data) {
          const dataRecord = data as Record<string, unknown>
          dataRecord.cta = normalizeCTAValue(dataRecord.cta)
        }

        return data
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (doc && typeof doc === 'object' && 'cta' in doc) {
          const docRecord = doc as Record<string, unknown>
          docRecord.cta = normalizeCTAValue(docRecord.cta)
        }

        return doc
      },
    ],
  },
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
  ],
  timestamps: true,
}
