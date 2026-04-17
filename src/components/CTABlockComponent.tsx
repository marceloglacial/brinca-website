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
  primary: 'default',
  secondary: 'secondary',
  link: 'link',
}

export default function CTABlockComponent({ block, locale }: Props) {
  const buttons = (block.buttons ?? [])
    .map((b) => ({ ...b, href: resolveLink(b, locale) }))
    .filter((b) => b.href)

  if (buttons.length === 0) return null

  return (
    <div className="cta-block flex flex-wrap gap-3 my-8">
      {buttons.map((button, index) => (
        <Button
          key={index}
          asChild
          variant={variantMap[button.style ?? 'primary'] as any}
          size="default"
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
