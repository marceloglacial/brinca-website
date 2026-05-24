import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'
import { RichTextBlock } from '../blocks/RichTextBlock'
import { GalleryBlock } from '../blocks/GalleryBlock'
import { InstagramBlock } from '../blocks/InstagramBlock'
import { CTABlock } from '../blocks/CTABlock'
import { ImageBlock } from '../blocks/ImageBlock'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'createdAt'],
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
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
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
      name: 'components',
      type: 'blocks',
      labels: {
        singular: 'Component',
        plural: 'Components',
      },
      blocks: [RichTextBlock, GalleryBlock, InstagramBlock, CTABlock, ImageBlock],
    },
  ],
  timestamps: true,
}
