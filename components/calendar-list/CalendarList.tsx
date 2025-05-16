import { CardGrid } from '@/components'
import { COLLECTIONS, DICTIONARY, SITE } from '@/constants'
import { getPageDataBySlug } from '@/lib'
import { formatDate } from '@/utils'
import { FC } from 'react'

export const CalendarList: FC<CalendarListProps> = async (props) => {
  const result = await getPageDataBySlug(COLLECTIONS.CALENDARS, props.locale, 'date')

  if (result.status === 'error') return <>{result.message}</>

  const content = result.data as CardGridItemType[]
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
      {upcomingItems.length > 0 && <CardGrid items={upcomingItems} locale={props.locale} />}
      {pastItems.length > 0 && (
        <CardGrid
          title={
            DICTIONARY.PAST_EVENTS[
              (props.locale || SITE.DEFAULT_LOCALE) as keyof typeof DICTIONARY.PAST_EVENTS
            ]
          }
          items={pastItems}
          locale={props.locale}
        />
      )}
    </div>
  )
}
