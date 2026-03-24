import { LOCALE_CODES, type LocaleCode } from '@/constants/locales'

export function isSupportedLocale(locale: string): locale is LocaleCode {
  return LOCALE_CODES.includes(locale as LocaleCode)
}
