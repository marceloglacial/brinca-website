import { ReactNode } from 'react'
import styles from './CardStyles'

export interface CardBodyProps {
  children: ReactNode
}

const CardBody = (props: CardBodyProps & React.JSX.IntrinsicElements['div']) => {
  const { children } = props
  return (
    <div {...props} className={`${styles.body}`}>
      {children}
    </div>
  )
}
export default CardBody
