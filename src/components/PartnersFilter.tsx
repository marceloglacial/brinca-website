import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getLocalizedValue } from '@/lib/locales'
import { Button } from '@/components/ui/button'

interface PartnersFilterProps {
  locale: string
  activeCategorySlug?: string
}

export default async function PartnersFilter({ locale, activeCategorySlug }: PartnersFilterProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: defaultPartnerPages } = await payload.find({
    collection: 'pages',
    where: {
      and: [{ slug: { equals: 'partners' } }, { status: { equals: 'published' } }],
    },
    locale: 'en' as any,
    limit: 1,
  })

  const defaultPartnerPage = defaultPartnerPages[0]

  const { docs: localizedPartnerPages } = defaultPartnerPage
    ? await payload.find({
        collection: 'pages',
        where: { id: { equals: defaultPartnerPage.id } },
        locale: locale as any,
        limit: 1,
      })
    : { docs: [] }

  const { docs: categories } = await payload.find({
    collection: 'partner-categories',
    sort: 'title',
    locale: locale as any,
    limit: 100,
  })

  if (categories.length === 0) return null

  const allLabel = locale === 'pt-BR' ? 'Todos' : 'All'
  const categoriesLabel = locale === 'pt-BR' ? 'Categorias' : 'Categories'
  const localizedPartnersSlug =
    getLocalizedValue(localizedPartnerPages[0]?.slug, locale) ||
    getLocalizedValue(defaultPartnerPage?.slug, 'en')
  const allHref = `/${locale}/${localizedPartnersSlug || 'partners'}`

  return (
    <section className="space-y-3 md:space-y-4">
      <h2 className="text-sm font-bold tracking-tight text-slate-900 md:text-base">
        {categoriesLabel}
      </h2>
      <nav>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          <li>
            <Button
              asChild
              variant="ghost"
              className={
                !activeCategorySlug
                  ? 'h-8 rounded-full border border-[#16a34a] bg-[#16a34a] px-3 text-md font-semibold text-white shadow-none hover:bg-[#15803d] hover:text-white'
                  : 'h-8 rounded-full border border-[#16a34a] bg-white px-3 text-md font-semibold text-[#16a34a] shadow-none hover:bg-[#16a34a]/8 hover:text-[#16a34a]'
              }
            >
              <Link href={allHref}>{allLabel}</Link>
            </Button>
          </li>
          {categories.map((category: any) => {
            const title = getLocalizedValue(category.title, locale)
            const slug = getLocalizedValue(category.slug, locale)
            const isActive = activeCategorySlug === slug
            return (
              <li key={category.id}>
                <Button
                  asChild
                  variant="ghost"
                  className={
                    isActive
                      ? 'h-8 rounded-full border border-[#16a34a] bg-[#16a34a] px-3 text-md font-semibold text-white shadow-none hover:bg-[#15803d] hover:text-white'
                      : 'h-8 rounded-full border border-[#16a34a] bg-white px-3 text-md font-semibold text-[#16a34a] shadow-none hover:bg-[#16a34a]/8 hover:text-[#16a34a]'
                  }
                >
                  <Link href={`/${locale}/partners/tag/${slug}`}>{title}</Link>
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    </section>
  )
}
