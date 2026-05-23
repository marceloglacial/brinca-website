import HeroSection from '@/components/brinca/HeroSection'
import { getLocalizedValue } from '@/lib/locales'
import { resolveLink } from '@/lib/resolveLink'

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

export default function HeroBlockComponent({ block, locale }: Props) {
  const localizedTitle = getLocalizedValue(block.title, locale)
  const localizedDescription = getLocalizedValue(block.description, locale)
  const localizedCtaLabel = getLocalizedValue(block.cta?.label, locale)
  const shadowedImage = !block.image?.toLowerCase().includes('ebook')

  return (
    <HeroSection
      title={localizedTitle}
      description={localizedDescription}
      image={block.image}
      imageAlt={localizedTitle}
      reversed={block.direction !== 'left'}
      shadowedImage={shadowedImage}
      ctaHref={block.cta ? resolveLink(block.cta, locale) : null}
      ctaLabel={localizedCtaLabel}
    />
  )
}
