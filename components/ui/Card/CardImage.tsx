import { ReactNode } from 'react'
import styles from './CardStyles'

export interface CardImageProps {
  children: ReactNode
}

const CardImage = (props: CardImageProps & React.JSX.IntrinsicElements['div']) => {
  const { children } = props
  return (
    <figure {...props} className={`${styles.figure}`}>
      {children}
    </figure>
  )
}
export default CardImage
