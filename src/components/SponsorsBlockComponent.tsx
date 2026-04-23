import { getPayload } from 'payload'
import config from '@/payload.config'

interface SponsorsBlockProps {
  locale: string
  year?: number
}

const TIERS = [
  {
    value: 'diamond',
    label: { en: 'Diamond', 'pt-BR': 'Diamante' },
    color: 'text-yellow-600',
  },
  {
    value: 'silver',
    label: { en: 'Silver Premium', 'pt-BR': 'Prata Premium' },
    color: 'text-gray-600',
  },
  {
    value: 'bronze',
    label: { en: 'Bronze Essential', 'pt-BR': 'Bronze Essencial' },
    color: 'text-yellow-900',
  },
] as const

export default async function SponsorsBlockComponent({ locale, year }: SponsorsBlockProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const currentYear = year ?? new Date().getFullYear()

  const { docs: sponsors } = await payload.find({
    collection: 'sponsors',
    where: {
      and: [{ active: { equals: true } }, { year: { equals: currentYear } }],
    },
    limit: 100,
  })

  if (!sponsors || sponsors.length === 0) return null

  const heading = locale === 'pt-BR' ? `Patrocinadores ${currentYear}` : `${currentYear} Sponsors`

  return (
    <section className="flex items-center justify-center">
      <div className="mx-auto flex flex-col gap-2">
        <div className="text-2xl font-bold">{heading}</div>

        {TIERS.map((tier, index) => {
          const tierSponsors = sponsors.filter((sponsor: any) => sponsor.tier === tier.value)
          if (tierSponsors.length === 0) return null

          const tierLabel = locale === 'pt-BR' ? tier.label['pt-BR'] : tier.label.en

          return (
            <div
              key={tier.value}
              className={index < TIERS.length - 1 ? 'mb-4 border-b border-gray-200 pb-4' : ''}
            >
              <div className={`text-xl font-bold ${tier.color}`}>{tierLabel}</div>
              <div className="flex flex-wrap gap-4 md:gap-24">
                {tierSponsors.map((sponsor: any) => {
                  const inner = sponsor.logo ? (
                    <img src={sponsor.logo} alt={sponsor.name} className="h-14 object-contain md:h-28" />
                  ) : (
                    <span className="text-xl font-bold">{sponsor.name}</span>
                  )

                  return sponsor.website ? (
                    <a
                      key={sponsor.id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={sponsor.name}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={sponsor.id}>{inner}</div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
