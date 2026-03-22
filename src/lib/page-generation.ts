import { getPayload } from 'payload'

import type { Page } from '@/payload-types'
import { LOCALE_CODES } from '@/constants/locales'
import config from '@/payload.config'

export async function generateHomePageStaticParams() {
  return LOCALE_CODES.map((locale) => ({
    locale,
  }))
}

export async function generatePageStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of LOCALE_CODES) {
    const { docs: pages } = await payload.find({
      collection: 'pages',
      locale: locale as any,
      limit: 100,
    })

    pages.forEach((page: Page) => {
      const slug = typeof page.slug === 'string' ? page.slug : page.slug?.[locale]
      if (slug) {
        params.push({ locale, slug })
      }
    })
  }

  return params
}
