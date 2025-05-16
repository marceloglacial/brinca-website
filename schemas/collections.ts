import { z } from 'zod'

export const TimestampSchema = z.object({
  _seconds: z.number(),
  _nanoseconds: z.number(),
})

/** Schemas from DB
calendars
  blocks
  date
  slug
  title
categories
  slug
  title
collections
  active
  createdAt
  icon
  slug
  title
  updatedAt
events
  blocks
  date
  image
  slug
  title
forms
  collection_id
  fields
  show_title
  submit_type
  title
locales
  icon
  slug
  title
menus
  items
  menu_items
  title
pages
  blocks
  slug
  title
partners
  active
  address
  category
  description
  email
  facebook
  instagram
  linkedin
  logo
  membership_email
  phone
  title
  website
  whatsapp
sponsors
  active
  image
  link 
  title
 */

const BlockSchema = z.object({
  type: z.string(),
  value: z.unknown(),
})

export const CollectionSchema = z
  .object({
    id: z.string(),
    active: z.boolean().optional(),
    title: z.string(),
    slug: z.string().optional(),
    icon: z.string().optional(),
    blocks: z.array(BlockSchema).optional(),
    publishedAt: z.object({}).optional(), // TODO: Update the database to make it required
    createdAt: TimestampSchema.optional(), // TODO: Update the database to make it required
    updatedAt: TimestampSchema.optional(), // TODO: Update the database to make it required
  })
  .passthrough()
