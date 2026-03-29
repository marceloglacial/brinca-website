import { getPayload } from 'payload'
import config from '@/payload.config'
import PartnerCard from './PartnerCard'

interface PartnersListProps {
  locale: string
  categorySlug?: string
}

export default async function PartnersList({ locale, categorySlug }: PartnersListProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let query: any = {
    collection: 'partners',
    where: {
      active: { equals: true },
    },
    sort: 'title',
    locale: locale as any,
    depth: 1,
  }

  // Filter by category if slug is provided
  if (categorySlug && categorySlug !== '../') {
    const { docs: categories } = await payload.find({
      collection: 'partner-categories',
      where: {
        slug: { equals: categorySlug },
      },
      locale: locale as any,
    })

    if (categories.length > 0) {
      query.where.category = { equals: categories[0].id }
    } else {
      return null
    }
  }

  const { docs: partners } = await payload.find(query)

  if (!partners || partners.length === 0) return null

  return (
    <div className="partners-list grid grid-cols-1 gap-16 pt-8">
      {partners.map((partner: any) => (
        <PartnerCard key={partner.id} partner={partner} locale={locale} />
      ))}
    </div>
  )
}
