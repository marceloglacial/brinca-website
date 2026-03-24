export function formatDate(dateInput: string | Date, locale?: string, options?: Intl.DateTimeFormatOptions) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  try {
    return date.toLocaleDateString(locale || undefined, options)
  } catch (e) {
    return date.toLocaleDateString(undefined, options)
  }
}
