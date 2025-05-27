import { CardGrid } from '@/components'
import { getAllByCollection } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'
import { ContentListProps } from '@/types/content-list'
import { FC } from 'react'

export const ContentList: FC<ContentListProps> = async ({ data, locale }) => {
  const { type: collection, items_per_page: limit } = data
  const response = await getAllByCollection(collection, {
    locale,
    sortBy: 'date',
    limit,
  })

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST) return <>{response.message}</>

  const items = response.data.map<CardGridItemType>((item) => {
    return {
      id: item.id,
      link: `${collection}/${item.slug}`,
      slug: item.slug,
      title: item.title,
      image: item.image,
      date: item.date,
    }
  })

  const hasTitle = Object.values(data.title || {}).some((value) => value)

  return <CardGrid title={hasTitle ? data.title : undefined} items={items} locale={locale} />
}
