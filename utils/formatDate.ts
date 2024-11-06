export const formatDate = (timestamp: any, locale?: string): string => new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6).toLocaleDateString(locale || 'en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
})
