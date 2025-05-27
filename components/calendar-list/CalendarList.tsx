import { CardGrid } from '@/components'
import { COLLECTIONS, DICTIONARY, SITE } from '@/constants'
import { getAllByCollection } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'
import { formatDate } from '@/utils'
import { FC } from 'react'

export const CalendarList: FC<CalendarListProps> = async ({ locale }) => {
  const response = await getAllByCollection(COLLECTIONS.CALENDARS, { locale, sortBy: 'date' })

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST) return <>{response.message}</>

  const content = response.data as CardGridItemType[]
  const items = content.map<CardGridItemType>((item) => {
    return {
      id: item.id,
      link: `${COLLECTIONS.CALENDARS}/${item.slug}`,
      slug: item.slug,
      title: item.title,
      image: item.image,
      date: item.date,
    }
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const pastItems = items.filter((item, idx) => {
    if (!item.date) return false
    return new Date(formatDate(content[idx].date)) < today
  })
  const upcomingItems = items.filter((item, idx) => {
    if (!item.date) return false
    return new Date(formatDate(content[idx].date)) >= today
  })

  return (
    <div className='grid grid-cols-1 gap-16'>
      {upcomingItems.length > 0 && <CardGrid items={upcomingItems} locale={locale} />}
      {pastItems.length > 0 && (
        <CardGrid
          title={
            DICTIONARY.PAST_EVENTS[
              (locale || SITE.DEFAULT_LOCALE) as keyof typeof DICTIONARY.PAST_EVENTS
            ]
          }
          items={pastItems}
          locale={locale}
        />
      )}
    </div>
  )
}
