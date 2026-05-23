import { getPayload } from 'payload'

import SubmitPartnerForm from './SubmitPartnerForm'
import { getLocalizedValue } from '@/lib/locales'
import config from '@/payload.config'
import type { PartnerCategory } from '@/payload-types'

type Props = {
  locale: string
}

export default async function PartnerSubmissionBlockComponent({ locale }: Props) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: categories } = await payload.find({
    collection: 'partner-categories',
    limit: 100,
  })

  const formattedCategories = (categories as PartnerCategory[])
    .map((cat) => ({
      id: typeof cat.id === 'string' ? cat.id : String(cat.id),
      name: getLocalizedValue(cat.title, locale),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, locale))

  return <SubmitPartnerForm categories={formattedCategories} />
}
