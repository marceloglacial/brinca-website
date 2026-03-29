import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getLocalizedValue } from '@/lib/locales'

interface PartnersFilterProps {
  locale: string
  activeCategorySlug?: string
}

export default async function PartnersFilter({ locale, activeCategorySlug }: PartnersFilterProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: categories } = await payload.find({
    collection: 'partner-categories',
    sort: 'title',
    locale: locale as any,
    limit: 100,
  })

  if (categories.length === 0) return null

  const allLabel = locale === 'pt-BR' ? 'Todos' : 'All'
  const categoriesLabel = locale === 'pt-BR' ? 'Categorias' : 'Categories'

  return (
    <nav>
      <h4 className="mb-3 text-lg font-bold">{categoriesLabel}</h4>
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        <li>
          <Link
            href={`/${locale}/partners`}
            className={`block rounded px-2 py-1 transition-opacity hover:opacity-70${!activeCategorySlug ? ' font-bold underline' : ''}`}
          >
            {allLabel}
          </Link>
        </li>
        {categories.map((category: any) => {
          const title = getLocalizedValue(category.title, locale)
          const slug = getLocalizedValue(category.slug, locale)
          const isActive = activeCategorySlug === slug
          return (
            <li key={category.id}>
              <Link
                href={`/${locale}/partners/tag/${slug}`}
                className={`block rounded px-2 py-1 transition-opacity hover:opacity-70${isActive ? ' font-bold underline' : ''}`}
              >
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
