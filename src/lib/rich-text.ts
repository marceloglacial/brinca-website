import type { SerializedLinkNode } from '@payloadcms/richtext-lexical'
import { LinkJSXConverter, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

function getDocValue(linkNode: SerializedLinkNode) {
  const doc = linkNode.fields.doc

  if (!doc || !doc.value || typeof doc.value !== 'object') {
    return null
  }

  return doc.value
}

function getLocalizedSlug(value: unknown, locale: string): null | string {
  if (typeof value === 'string') return value

  if (value && typeof value === 'object' && locale in value) {
    const localizedValue = (value as Record<string, unknown>)[locale]
    return typeof localizedValue === 'string' ? localizedValue : null
  }

  return null
}

function internalDocToHref({
  linkNode,
  locale,
}: {
  linkNode: SerializedLinkNode
  locale: string
}): string {
  const relationTo = linkNode.fields.doc?.relationTo
  const docValue = getDocValue(linkNode)
  const slug = getLocalizedSlug(docValue?.slug, locale)

  if (!relationTo || !slug) {
    console.warn('RichText internal link could not be resolved for locale', {
      locale,
      relationTo,
    })
    return ''
  }

  switch (relationTo) {
    case 'pages':
      return `/${locale}/${slug}`
    case 'events':
      return `/${locale}/events/${slug}`
    case 'calendars':
      return `/${locale}/calendars/${slug}`
    default:
      console.warn('RichText internal link uses unsupported relation', {
        locale,
        relationTo,
      })
      return ''
  }
}

export function getRichTextConverters(locale: string): JSXConvertersFunction {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({
      internalDocToHref: ({ linkNode }) => internalDocToHref({ linkNode, locale }),
    }),
  })
}
