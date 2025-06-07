import { CardGrid } from '@/components'
import { COLLECTIONS, DICTIONARY, SITE } from '@/constants'
import { getAllByCollection } from '@/lib/api'
import { HttpStatusSchema } from '@/schemas/api'
import { FC } from 'react'
import { convertTimestampToDate } from '@/utils'

export const CalendarList: FC<CalendarListProps> = async ({ locale }) => {
  const response = await getAllByCollection(COLLECTIONS.CALENDARS, {
    locale,
    sortBy: 'date',
    order: 'desc',
  })

  if (response.status >= HttpStatusSchema.enum.BAD_REQUEST) return <>{response.message}</>

  const items = response.data.map<CardGridItemType>((item) => {
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
  const pastItems = items.filter((item) => {
    if (!item.date) return false
    return convertTimestampToDate(item.date) < today
  })
  const upcomingItems = items.filter((item) => {
    if (!item.date) return false
    return convertTimestampToDate(item.date) >= today
  })

  return (
    <div className='grid grid-cols-1 gap-16'>
      {upcomingItems.length > 0 && <CardGrid items={upcomingItems} locale={locale} />}
      {pastItems.length > 0 && (
        <CardGrid
          title={DICTIONARY.PAST_EVENTS[locale || SITE.DEFAULT_LOCALE]}
          items={pastItems}
          locale={locale}
        />
      )}
    </div>
  )
}
