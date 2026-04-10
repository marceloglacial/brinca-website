import Link from 'next/link'
import { resolveLink } from '@/lib/resolveLink'
import { Button } from '@/components/ui/button'
import type { ButtonHTMLAttributes } from 'react'

type ButtonStyle = 'primary' | 'secondary' | 'link'

type Props = {
  block: {
    blockType: 'heroBlock'
    title: string
    description?: string | null
    image?: string | null
    direction?: 'left' | 'right' | null
    cta?: {
      label?: string | null
      style?: ButtonStyle | null
      linkType?: 'internal' | 'external' | null
      internalLink?: any
      url?: string | null
      openInNewWindow?: boolean | null
    } | null
  }
  locale: string
}

const variantMap: Record<ButtonStyle, string> = {
  primary: 'primary',
  secondary: 'brandSecondary',
  link: 'brandLink',
}

export default function HeroBlockComponent({ block, locale }: Props) {
  const imageOnLeft = block.direction === 'left'
  const ctaHref = block.cta ? resolveLink(block.cta, locale) : null
  const variant = variantMap[block.cta?.style ?? 'primary']

  return (
    <section className="hero-block py-16">
      <div className={`hero-inner flex items-center gap-12 ${imageOnLeft ? 'flex-row-reverse' : ''}`}>
        <div className="hero-content flex-1 flex flex-col gap-5">
          <h1 className="hero-title text-5xl font-bold leading-tight m-0">{block.title}</h1>
          {block.description && <p className="hero-description text-xl leading-relaxed m-0 opacity-80">{block.description}</p>}
          {ctaHref && (
            <Button asChild variant={variant as any} size="lg" className="w-fit">
              <Link
                href={ctaHref}
                {...(block.cta?.openInNewWindow
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {block.cta?.label || ctaHref}
              </Link>
            </Button>
          )}
        </div>

        {block.image && (
          <div className="hero-image-wrap flex-1">
            <img src={block.image} alt={block.title} className="hero-image w-full h-auto rounded-lg object-cover" />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-inner {
            flex-direction: column !important;
          }
          .hero-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
