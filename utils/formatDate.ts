import { formatLocale } from './localization'

export const formatDate = (timestamp: any, locale?: LocalesType): string => {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6).toLocaleDateString(formatLocale(locale ?? 'en'), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

}
