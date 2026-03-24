export function formatDate(
  dateInput: string | Date,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

  let safeLocale: string | undefined

  if (typeof Intl !== 'undefined' && locale) {
    try {
      const [canonicalLocale] = Intl.getCanonicalLocales(locale)

      if (canonicalLocale && Intl.DateTimeFormat.supportedLocalesOf(canonicalLocale).length > 0) {
        safeLocale = canonicalLocale
      }
    } catch {
      safeLocale = undefined
    }
  }

  try {
    return date.toLocaleDateString(safeLocale, options)
  } catch {
    return date.toLocaleDateString(undefined, options)
  }
}
