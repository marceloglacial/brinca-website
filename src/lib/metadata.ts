import type { Metadata } from 'next'

export const SITE_NAME = 'Brinca'

export const SITE_DESCRIPTION_BY_LOCALE: Record<string, string> = {
  en: 'Your Brazilian community in Ottawa-Gatineau!',
  'pt-BR': 'Sua comunidade brasileira em Ottawa-Gatineau!',
}

export function getSiteDescription(locale: string) {
  return SITE_DESCRIPTION_BY_LOCALE[locale] ?? SITE_DESCRIPTION_BY_LOCALE.en
}

export function getDefaultSiteTitle(locale: string) {
  return `${SITE_NAME} - ${getSiteDescription(locale)}`
}

export function buildLocaleMetadata(locale: string): Metadata {
  return {
    description: getSiteDescription(locale),
    title: {
      default: getDefaultSiteTitle(locale),
      template: '%s',
    },
  }
}

export function withSiteName(title: string) {
  return `${title} | ${SITE_NAME}`
}
