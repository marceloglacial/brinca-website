import Link from 'next/link'
import { resolveLink } from '@/lib/resolveLink'

type Button = {
  label?: string | null
  linkType?: 'internal' | 'external' | null
  internalLink?: any
  url?: string | null
  openInNewWindow?: boolean | null
}

type Props = {
  block: {
    blockType: 'ctaBlock'
    buttons?: Button[] | null
  }
  locale: string
}

export default function CTABlockComponent({ block, locale }: Props) {
  const buttons = (block.buttons ?? [])
    .map((b) => ({ ...b, href: resolveLink(b, locale) }))
    .filter((b) => b.href)

  if (buttons.length === 0) return null

  return (
    <div className="page-cta" style={{ margin: '2rem 0', display: 'grid', gap: '0.75rem' }}>
      {buttons.map((button, index) => (
        <div key={index} className="action-button-wrapper">
          <Link
            href={button.href!}
            className="action-button"
            {...(button.openInNewWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {button.label || button.href}
          </Link>
        </div>
      ))}
    </div>
  )
}
