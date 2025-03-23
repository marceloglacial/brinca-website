import CardBody from './CardBody'
import CardFooter from './CardFooter'
import CardImage from './CardImage'
import styles from './CardStyles'

export interface CardProps {
  noShadown?: boolean
  squared?: boolean
  children: React.ReactNode
}

const CardContainer = (props: CardProps & React.JSX.IntrinsicElements['div']) => {
  const { noShadown, squared, children } = props
  const noShadownStyles = noShadown ? '' : styles.shadow
  const squaredStyles = squared ? '' : styles.rounded
  return (
    <div {...props} className={`${styles.container} ${noShadownStyles} ${squaredStyles}`}>
      {children}
    </div>
  )
}

export const Card = Object.assign(CardContainer, {
  Image: CardImage,
  Body: CardBody,
  Footer: CardFooter,
})

CardContainer.displayName = 'Card'
;(CardImage as React.FC).displayName = 'Card.Image'
;(CardBody as React.FC).displayName = 'Card.Body'
;(CardFooter as React.FC).displayName = 'Card.Footer'
