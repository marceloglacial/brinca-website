import { getPayload } from 'payload'
import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'

import SubmitPartnerForm from './SubmitPartnerForm'
import config from '@/payload.config'
import type { PartnerCategory } from '@/payload-types'

type Props = {
  block: {
    id?: string | null
    blockType: 'partnerSubmissionBlock'
    introText?: object | null
  }
}

export default async function PartnerSubmissionBlockComponent({ block }: Props) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch all partner categories for the form
  const { docs: categories } = await payload.find({
    collection: 'partner-categories',
    limit: 100,
  })

  const formattedCategories = (categories as PartnerCategory[]).map((cat) => ({
    id: typeof cat.id === 'string' ? cat.id : String(cat.id),
    name: cat.title || '',
  }))

  return (
    <div className="partner-submission-block">
      {block.introText ? (
        <div className="intro-text" style={{ marginBottom: '2rem' }}>
          <RichText data={block.introText as any} converters={defaultJSXConverters} />
        </div>
      ) : null}

      <SubmitPartnerForm categories={formattedCategories} />
    </div>
  )
}
