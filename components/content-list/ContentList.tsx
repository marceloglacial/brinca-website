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
  const items = content.map<CardGridItemType>((item) => ({
    ...item,
    link: `${data.type}/${item.slug}`,
  }))

  const hasTitle = Object.values(data.title || {}).some((value) => value)

  return <CardGrid title={hasTitle ? data.title : undefined} items={items} locale={locale} />
}
