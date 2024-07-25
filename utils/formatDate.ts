export const formatDate = (d: string, locale?: string): string => new Date(d).toLocaleDateString(locale || 'en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
})
