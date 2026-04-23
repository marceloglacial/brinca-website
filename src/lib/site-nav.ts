import { SITE_NAV_ITEMS } from '@/constants/site-nav'

type NavPage = {
  id: string
  title?: string | null
  slug?: string | null
}

export function buildSiteNav(locale: string, pages: NavPage[]) {
  const bySlug = new Map<string, NavPage>()
  const byTitle = new Map<string, NavPage>()

  for (const page of pages) {
    const slug = page.slug?.toLowerCase()
    const title = page.title?.toLowerCase()

    if (slug) bySlug.set(slug, page)
    if (title) byTitle.set(title, page)
  }

  return SITE_NAV_ITEMS.map((item) => {
    const localizedLabel = item.labels[locale as keyof typeof item.labels] ?? item.labels.en
    const page =
      bySlug.get(item.key) ??
      bySlug.get(item.fallbackSlug) ??
      byTitle.get(item.labels.en.toLowerCase()) ??
      byTitle.get(localizedLabel.toLowerCase())

    return {
      key: item.key,
      href: page?.slug ? `/${locale}/${page.slug}` : `/${locale}/${item.fallbackSlug}`,
      label: page?.title || localizedLabel,
    }
  })
}
