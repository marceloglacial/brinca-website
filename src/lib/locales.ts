import { LOCALE_CODES, type LocaleCode } from '@/constants/locales'

export function isSupportedLocale(locale: string): locale is LocaleCode {
  return LOCALE_CODES.includes(locale as LocaleCode)
}

export function getLocalizedValue(value: any, locale: string): string {
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && locale in value) {
    return value[locale]
  }
  return ''
}
