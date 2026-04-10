import Link from 'next/link'
import { resolveLink } from '@/lib/resolveLink'
import { buttonClass, buttonStyles, type ButtonStyle } from '@/lib/buttonStyles'

type Button = {
  label?: string | null
  style?: ButtonStyle | null
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
    <div className="cta-block">
      {buttons.map((button, index) => (
        <Link
          key={index}
          href={button.href!}
          className={buttonClass[button.style ?? 'primary']}
          {...(button.openInNewWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {button.label || button.href}
        </Link>
      ))}

      <style>{`
        .cta-block {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin: 2rem 0;
        }
        ${buttonStyles}
      `}</style>
    </div>
  )
}
