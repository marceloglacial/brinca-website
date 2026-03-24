export function formatDate(
  dateInput: string | Date,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

  const supportedLocales =
    typeof Intl !== 'undefined' && locale
      ? Intl.DateTimeFormat.supportedLocalesOf(locale)
      : []
  const safeLocale = supportedLocales.length > 0 ? locale : undefined

  try {
    // Node may throw if locale is not supported; safeLocale guards against that.
    return date.toLocaleDateString(safeLocale || undefined, options)
  } catch (e) {
    return date.toLocaleDateString(undefined, options)
  }
}
