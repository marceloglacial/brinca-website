import type { Block } from 'payload'

export const YouTubeBlock: Block = {
  slug: 'youTubeBlock',
  labels: {
    singular: 'YouTube Block',
    plural: 'YouTube Blocks',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'YouTube URL',
      admin: {
        description: 'YouTube video URL or video ID',
      },
    },
  ],
}
