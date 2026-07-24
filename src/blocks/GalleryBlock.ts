import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  labels: {
    singular: 'Gallery Block',
    plural: 'Gallery Blocks',
  },
  fields: [
    {
      name: 'cloudinaryFolder',
      type: 'text',
      required: true,
      label: 'Cloudinary Folder Path',
      admin: {
        description: 'Cloudinary folder path to load images from (e.g. brinca/events/2026)',
        components: {
          Field: '@/components/CloudinaryFolderField#CloudinaryFolderField',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
      admin: {
        description: 'Optional heading displayed above the gallery',
      },
    },
  ],
}
