import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'
import { PartnerSubmissionBlock } from '../blocks/PartnerSubmissionBlock'
import { MentorSubmissionBlock } from '../blocks/MentorSubmissionBlock'
import { MentorRequestBlock } from '../blocks/MentorRequestBlock'
import { ContactFormBlock } from '../blocks/ContactFormBlock'
import { SponsorsBlock } from '../blocks/SponsorsBlock'
import { EventsListBlock } from '../blocks/EventsListBlock'
import { CalendarsListBlock } from '../blocks/CalendarsListBlock'
import { PartnersListBlock } from '../blocks/PartnersListBlock'
import { YouTubeBlock } from '../blocks/YouTubeBlock'
import { GalleryBlock } from '../blocks/GalleryBlock'
import { InstagramBlock } from '../blocks/InstagramBlock'
import { CTABlock } from '../blocks/CTABlock'
import { RichTextBlock } from '../blocks/RichTextBlock'
import { HeroBlock } from '../blocks/HeroBlock'

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
      name: 'showInNavbar',
      type: 'checkbox',
      label: 'Show in Navbar',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isHome',
      type: 'checkbox',
      label: 'Home Page',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Mark this page as the site home page',
      },
    },
    {
      name: 'components',
      type: 'blocks',
      labels: {
        singular: 'Component',
        plural: 'Components',
      },
      blocks: [
        PartnerSubmissionBlock,
        MentorSubmissionBlock,
        MentorRequestBlock,
        ContactFormBlock,
        SponsorsBlock,
        EventsListBlock,
        CalendarsListBlock,
        PartnersListBlock,
        YouTubeBlock,
        GalleryBlock,
        InstagramBlock,
        CTABlock,
        RichTextBlock,
        HeroBlock,
      ],
    },
  ],
  timestamps: true,
}
