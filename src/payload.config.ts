import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Events } from './collections/Events'
import { Calendars } from './collections/Calendars'
import { Partners } from './collections/Partners'
import { PartnerCategories } from './collections/PartnerCategories'
import { Mentors } from './collections/Mentors'
import { MentorRequests } from './collections/MentorRequests'
import { Sponsors } from './collections/Sponsors'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'pt-BR', label: 'Português (Brasil)' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [Users, Media, Pages, Events, Calendars, PartnerCategories, Partners, Mentors, MentorRequests, Sponsors],
  editor: lexicalEditor(),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_ADDRESS || '',
    defaultFromName: process.env.RESEND_FROM_NAME || 'Brinca',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
})
