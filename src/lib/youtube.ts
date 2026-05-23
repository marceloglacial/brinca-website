export function extractYouTubeId(input: unknown): string | null {
  if (!input) return null
  const str = String(input).trim()

  // Try parsing as URL
  try {
    const url = new URL(str)
    const host = url.hostname.toLowerCase()
    if (host.includes('youtube.com')) {
      return url.searchParams.get('v') || null
    }
    if (host === 'youtu.be') {
      return url.pathname.slice(1) || null
    }
  } catch (e) {
    // Not a URL, fall through to ID heuristics
  }

  // Fallback: look for a 11-character YouTube ID in the string
  const match = str.match(/[a-zA-Z0-9_-]{11}/)
  return match ? match[0] : null
}

export function getYouTubeEmbedUrl(id: string | null): string | null {
  return id ? `https://www.youtube.com/embed/${id}` : null
}
