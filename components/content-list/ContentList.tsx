import { CardGrid } from '@/components'
import { getPageDataBySlug } from '@/lib'
import { FC } from 'react'

export const ContentList: FC<ContentListProps> = async ({ data, locale }) => {
  const result = await getPageDataBySlug(
    data.type,
    locale,
    'date',
    undefined,
    undefined,
    data.items_per_page
  )

  if (result.status === 'error') return <>{result.message}</>

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
