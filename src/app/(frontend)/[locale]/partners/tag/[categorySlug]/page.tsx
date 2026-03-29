import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'
import config from '@/payload.config'
import { getLocalizedData, getLocalizedValue } from '@/lib/locales'
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
  return { title: `${categoryTitle} | Partners | Brinca` }
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
  const contentValue = page ? getLocalizedData(page.content, locale) : null

  return (
    <div className="page-view">
      <SetSlug slugs={slugMap} />
      <div className="page-header">
        <h1>{pageTitle}</h1>
      </div>

      {contentValue && typeof contentValue === 'object' && (contentValue as any).root ? (
        <div className="page-content">
          <RichText data={contentValue as any} converters={defaultJSXConverters} />
        </div>
      ) : typeof contentValue === 'string' ? (
        <div className="page-content">{contentValue}</div>
      ) : null}

      <div className="mt-8 flex flex-col gap-8 md:flex-row">
        <aside className="w-full flex-shrink-0 md:w-56">
          <PartnersFilter locale={locale} activeCategorySlug={categorySlug} />
        </aside>
        <div className="flex-1">
          <PartnersList locale={locale} categorySlug={categorySlug} />
        </div>
      </div>
    </div>
  )
}
