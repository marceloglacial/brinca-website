import { ReactNode } from 'react'
import styles from './CardStyles'

export interface CardFooterProps {
  children: ReactNode
}

const CardFooter = (props: CardFooterProps & React.JSX.IntrinsicElements['div']) => {
  const { children } = props
  return (
    <div {...props} className={`${styles.footer}`}>
      {children}
    </div>
  )
}
export default CardFooter
