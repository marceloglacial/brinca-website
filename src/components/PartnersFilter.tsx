import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getLocalizedValue } from '@/lib/locales'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{categoriesLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        <nav>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            <li>
              <Button asChild variant={!activeCategorySlug ? 'secondary' : 'ghost'} className="w-full justify-start">
                <Link href={`/${locale}/partners`}>
                  {allLabel}
                </Link>
              </Button>
            </li>
            {categories.map((category: any) => {
              const title = getLocalizedValue(category.title, locale)
              const slug = getLocalizedValue(category.slug, locale)
              const isActive = activeCategorySlug === slug
              return (
                <li key={category.id}>
                  <Button asChild variant={isActive ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Link href={`/${locale}/partners/tag/${slug}`}>
                      {title}
                    </Link>
                  </Button>
                </li>
              )
            })}
          </ul>
        </nav>
      </CardContent>
    </Card>
  )
}
