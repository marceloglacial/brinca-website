import { ReactNode } from 'react'
import styles from './HeadingStyles'

export interface HeadingProps {
  children?: ReactNode
}

export const Heading = (props: HeadingProps & React.JSX.IntrinsicElements['div']) => {
  const { children, ...rest } = props
  return (
    <div {...rest} className={`${styles.container} `}>
      {children}
    </div>
  )
}
