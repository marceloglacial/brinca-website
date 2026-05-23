import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

export const PartnerCategories: CollectionConfig = {
  slug: 'partner-categories',
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
  ],
  timestamps: true,
}
