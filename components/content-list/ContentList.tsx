import { CardGrid } from '@/components'
import { getCollection } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'
import { FC } from 'react'

export const ContentList: FC<ContentListProps> = async ({ data, locale }) => {
  const collection = data.type
  const result = await getCollection(collection, {
    locale,
    sortBy: 'date',
    limit: data.items_per_page,
  })

  if (result.status >= HttpStatusSchema.enum.BAD_REQUEST) return <>{result.message}</>

  const content = result.data as CardGridItemType[]
  const items = content.map((item: CardGridItemType): CardGridItemType => {
    return {
      id: item.id,
      link: `${data.type}/${item.slug}`,
      slug: item.slug,
      title: item.title,
      image: item.image,
      date: item.date,
    }
  })

  const hasTitle = Object.values(data.title || {}).some((value) => value)

  return <CardGrid title={hasTitle ? data.title : undefined} items={items} locale={locale} />
}
