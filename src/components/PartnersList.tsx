import { getPayload } from 'payload'
import config from '@/payload.config'
import PartnerCard from './PartnerCard'
import SectionHeading from './brinca/SectionHeading'

interface PartnersListProps {
  locale: string
  categorySlug?: string
}

function hasMembershipEmail(partner: any) {
  return typeof partner.membershipEmail === 'string' && partner.membershipEmail.trim().length > 0
}

function renderPartnersGrid(partners: any[], locale: string, showLogo = true) {
  if (partners.length === 0) return null

  return (
    <div className="partners-list grid grid-cols-1 gap-5 pt-1 md:gap-6 xl:grid-cols-2">
      {partners.map((partner: any) => (
        <PartnerCard key={partner.id} partner={partner} locale={locale} showLogo={showLogo} />
      ))}
    </div>
  )
}

export default async function PartnersList({ locale, categorySlug }: PartnersListProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let query: any = {
    collection: 'partners',
    where: {
      active: { equals: true },
    },
    limit: 100,
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

  const associatedPartners = partners.filter(hasMembershipEmail)
  const communityPartners = partners.filter((partner: any) => !hasMembershipEmail(partner))
  const associatedLabel = locale === 'pt-BR' ? 'Associados' : 'Associated'
  const communityLabel = locale === 'pt-BR' ? 'Comunidade' : 'Community'

  return (
    <div className="space-y-8 md:space-y-10">
      {associatedPartners.length > 0 ? (
        <section className="space-y-4 md:space-y-5">
          <SectionHeading title={associatedLabel} />
          {renderPartnersGrid(associatedPartners, locale)}
        </section>
      ) : null}

      {communityPartners.length > 0 ? (
        <section className="space-y-4 md:space-y-5">
          <SectionHeading title={communityLabel} />
          {renderPartnersGrid(communityPartners, locale, false)}
        </section>
      ) : null}
    </div>
  )
}
