import { Timestamp } from '@/types/new-api'
import { formatLocale } from './localization'

export const convertTimestampToDate = (timestamp: Timestamp) => {
  return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6)
}

export const formatDate = (timestamp: Timestamp, locale?: LocalesType): string => {
  return convertTimestampToDate(timestamp).toLocaleDateString(formatLocale(locale ?? 'en'), {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
