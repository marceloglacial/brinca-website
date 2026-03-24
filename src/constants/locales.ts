export const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'pt-BR', label: 'Português' },
]

export const LOCALE_CODES = LOCALES.map((locale) => locale.code)

export type LocaleCode = (typeof LOCALE_CODES)[number]
