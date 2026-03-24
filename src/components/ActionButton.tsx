import Link from 'next/link'
import type { FC } from 'react'
import { getLocalizedValue } from '@/lib/lexical'

type ButtonGroup = {
  title?: any
  url?: any
  openInNewWindow?: boolean | null
}

type Props = {
  button?: ButtonGroup | null
  locale: string
}

const ActionButton: FC<Props> = ({ button, locale }) => {
  if (!button) return null

  const title = getLocalizedValue(button.title, locale) || getLocalizedValue(button.url, locale) || ''
  const href = getLocalizedValue(button.url, locale) || button.url || ''
  if (!href) return null

  const target = button.openInNewWindow ? '_blank' : undefined
  const rel = button.openInNewWindow ? 'noopener noreferrer' : undefined

  return (
    <div className="action-button-wrapper">
      <Link href={href} target={target} rel={rel} className="action-button">
        {title || href}
      </Link>
    </div>
  )
}

export default ActionButton
