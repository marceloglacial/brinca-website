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
    color: 'text-gray-500',
  },
  {
    value: 'bronze',
    label: { en: 'Bronze Essential', 'pt-BR': 'Bronze Essencial' },
    color: 'text-yellow-900',
  },
] as const

export default async function SponsorsBlock({ locale, year }: SponsorsBlockProps) {
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
    <section className="sponsors-block w-full py-10">
      <h2 className="mb-8 text-center text-3xl font-bold">{heading}</h2>
      <div className="flex flex-col gap-6">
        {TIERS.map((tier) => {
          const tierSponsors = sponsors.filter((s: any) => s.tier === tier.value)
          if (tierSponsors.length === 0) return null

          const tierLabel = locale === 'pt-BR' ? tier.label['pt-BR'] : tier.label['en']

          return (
            <div key={tier.value} className="border-b border-gray-200 pb-6 last:border-0">
              <p
                className={`mb-4 text-center text-sm font-semibold uppercase tracking-widest ${tier.color}`}
              >
                {tierLabel}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-24">
                {tierSponsors.map((sponsor: any) => {
                  const inner = sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="h-14 w-auto object-contain md:h-28"
                    />
                  ) : (
                    <span className="text-center text-sm font-medium text-white">
                      {sponsor.name}
                    </span>
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
