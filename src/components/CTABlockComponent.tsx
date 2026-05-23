import Link from 'next/link'
import { resolveLink } from '@/lib/resolveLink'
import { Button } from '@/components/ui/button'

type ButtonStyle = 'primary' | 'secondary' | 'link'

type Button_Type = {
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
    buttons?: Button_Type[] | null
  }
  locale: string
}

const variantMap: Record<ButtonStyle, string> = {
  primary: 'brincaSolid',
  secondary: 'brincaOutline',
  link: 'link',
}

export default function CTABlockComponent({ block, locale }: Props) {
  const buttons = (block.buttons ?? [])
    .map((b) => ({ ...b, href: resolveLink(b, locale) }))
    .filter((b) => b.href)

  if (buttons.length === 0) return null

  return (
    <div className="cta-block my-8 flex flex-wrap justify-center gap-4">
      {buttons.map((button, index) => (
        <Button
          key={index}
          asChild
          variant={variantMap[button.style ?? 'primary'] as any}
          size={button.style === 'link' ? 'default' : 'brinca'}
        >
          <Link
            href={button.href!}
            {...(button.openInNewWindow ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {button.label || button.href}
          </Link>
        </Button>
      ))}
    </div>
  )
}
