import { getPayload } from 'payload'

import SubmitPartnerForm from './SubmitPartnerForm'
import config from '@/payload.config'
import type { PartnerCategory } from '@/payload-types'

export default async function PartnerSubmissionBlockComponent() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: categories } = await payload.find({
    collection: 'partner-categories',
    limit: 100,
  })

  const formattedCategories = (categories as PartnerCategory[]).map((cat) => ({
    id: typeof cat.id === 'string' ? cat.id : String(cat.id),
    name: cat.title || '',
  }))

  return <SubmitPartnerForm categories={formattedCategories} />
}
