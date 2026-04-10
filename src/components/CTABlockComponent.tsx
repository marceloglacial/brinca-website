import ActionButton from './ActionButton'

type Props = {
  block: {
    blockType: 'ctaBlock'
    buttons?: Array<{
      title?: any
      url?: any
      openInNewWindow?: boolean | null
    }> | null
  }
  locale: string
}

export default function CTABlockComponent({ block, locale }: Props) {
  const buttons = (block.buttons ?? []).filter((b) => Boolean(b?.url))

  if (buttons.length === 0) return null

  return (
    <div className="page-cta" style={{ margin: '2rem 0', display: 'grid', gap: '0.75rem' }}>
      {buttons.map((button, index) => (
        <ActionButton key={`${button?.url ?? 'cta'}-${index}`} button={button} locale={locale} />
      ))}
    </div>
  )
}
