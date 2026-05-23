import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import PageHeading from '@/components/brinca/PageHeading'
import { getLocalizedValue } from '@/lib/locales'
import { withSiteName } from '@/lib/metadata'
import PartnersList from '@/components/PartnersList'
import PartnersFilter from '@/components/PartnersFilter'
import { SetSlug } from '@/components/SlugProvider'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>
}) {
  const { locale, categorySlug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: cats } = await payload.find({
    collection: 'partner-categories',
    where: { slug: { equals: categorySlug } },
    locale: locale as any,
    limit: 1,
  })

  const categoryTitle = cats[0] ? getLocalizedValue(cats[0].title, locale) : categorySlug
  const partnersLabel = locale === 'pt-BR' ? 'Parceiros' : 'Partners'
  return { title: withSiteName(`${categoryTitle} | ${partnersLabel}`) }
}

export default async function PartnersTagPage(props: {
  params: Promise<{ locale: string; categorySlug: string }>
}) {
  const { locale, categorySlug } = await props.params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Validate the category exists
  const { docs: cats } = await payload.find({
    collection: 'partner-categories',
    where: { slug: { equals: categorySlug } },
    locale: locale as any,
    limit: 1,
  })

  if (cats.length === 0) {
    notFound()
  }

  const category = cats[0]

  // Build locale slug map for language switcher
  const slugMap: Record<string, string> = {}
  for (const l of ['en', 'pt-BR']) {
    const { docs: localizedCats } = await payload.find({
      collection: 'partner-categories',
      where: { id: { equals: category.id } },
      locale: l as any,
      limit: 1,
    })
    const catSlug = localizedCats[0]?.slug
    if (catSlug) {
      slugMap[l] = `partners/tag/${catSlug}`
    }
  }

  // Fetch the partners page for its title and description
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'partners' } },
    locale: locale as any,
    limit: 1,
  })

  const page = docs[0]
  const pageTitle = page
    ? getLocalizedValue(page.title, locale)
    : locale === 'pt-BR'
      ? 'Parceiros'
      : 'Partners'

  return (
    <div className="page-view">
      <SetSlug slugs={slugMap} />
      <PageHeading title={pageTitle} />

      <div className="mt-2 flex flex-col gap-6 md:mt-4 md:gap-8">
        <div className="w-full">
          <PartnersFilter locale={locale} activeCategorySlug={categorySlug} />
        </div>
        <div className="flex-1">
          <PartnersList locale={locale} categorySlug={categorySlug} />
        </div>
      </div>
    </div>
  )
}
