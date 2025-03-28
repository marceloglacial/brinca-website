import { ButtonSizeTypes } from '..'
import styles from './LinkStyles'

export type LinkTypes = 'default' | 'primary' | 'secondary' | 'white'
export interface LinkProps {
  variant?: LinkTypes
  full?: boolean
  children: React.ReactNode
  size?: ButtonSizeTypes
}

export const Link = (props: LinkProps & React.JSX.IntrinsicElements['div']) => {
  const { variant = 'default', children, full, size = 'md' } = props
  const isFullClassName = full ? styles.full : ''
  const isButton = !['default', 'white'].includes(variant)
  const linkSize = isButton ? styles.size[size] : ''
  const componentProps = {
    ...props,
    full: undefined,
    className: `${styles[variant]} ${isFullClassName} ${linkSize} `,
  }
  return <div {...componentProps}>{children}</div>
}
