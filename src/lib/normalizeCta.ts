type CTAValue = {
  title?: unknown
  url?: unknown
  openInNewWindow?: unknown
}

const looksLikeLegacyCTAObject = (value: unknown): value is CTAValue => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false

  const cta = value as Record<string, unknown>
  return 'title' in cta || 'url' in cta || 'openInNewWindow' in cta
}

export const normalizeCTAValue = (value: unknown) => {
  if (Array.isArray(value) || value == null) return value
  if (looksLikeLegacyCTAObject(value)) return [value]
  return value
}
