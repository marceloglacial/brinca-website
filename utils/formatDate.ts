import { TimeStamp } from '@/types'
import { formatLocale } from './localization'

export const formatDate = (timestamp: TimeStamp | undefined, locale?: LocalesType) => {
  if (!timestamp) return ''

  const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formattedDate = date.toLocaleDateString(formatLocale(locale ?? 'en'), options)
  return formattedDate
}
