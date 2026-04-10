type InternalLink = {
  relationTo: 'pages' | 'events' | 'calendars'
  value: any
}

type LinkData = {
  linkType?: 'internal' | 'external' | null
  internalLink?: InternalLink | null
  url?: string | null
}

function getSlug(doc: any, locale: string): string | null {
  if (!doc) return null
  const slug = doc.slug
  if (typeof slug === 'string') return slug
  if (slug && typeof slug === 'object') return slug[locale] ?? slug['en'] ?? null
  return null
}

export function resolveLink(link: LinkData, locale: string): string | null {
  if (link.linkType === 'external' || !link.linkType) {
    return link.url ?? null
  }

  const internal = link.internalLink
  if (!internal?.value) return null

  const doc = typeof internal.value === 'object' ? internal.value : null
  if (!doc) return null

  const slug = getSlug(doc, locale)
  if (!slug) return null

  switch (internal.relationTo) {
    case 'pages':
      return `/${locale}/${slug}`
    case 'events':
      return `/${locale}/events/${slug}`
    case 'calendars':
      return `/${locale}/calendars/${slug}`
    default:
      return null
  }
}
