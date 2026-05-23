import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'
import { RichTextBlock } from '../blocks/RichTextBlock'
import { GalleryBlock } from '../blocks/GalleryBlock'
import { InstagramBlock } from '../blocks/InstagramBlock'
import { CTABlock } from '../blocks/CTABlock'
import { YouTubeBlock } from '../blocks/YouTubeBlock'

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
      name: 'components',
      type: 'blocks',
      labels: {
        singular: 'Component',
        plural: 'Components',
      },
      blocks: [RichTextBlock, GalleryBlock, InstagramBlock, CTABlock, YouTubeBlock],
    },
  ],
  timestamps: true,
}
