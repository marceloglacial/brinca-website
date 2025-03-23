import HeroBody from './HeroBody'
import HeroImage from './HeroImage'
import styles from './HeroStyles'

export interface HeroProps {
  children: React.ReactNode
  reversed?: boolean
}

const HeroContainer = (props: HeroProps & React.JSX.IntrinsicElements['div']) => {
  const { children, reversed } = props
  const isReversedClassName = reversed ? styles.reversed : ''
  return (
    <div {...props} className={`${styles.hero} ${isReversedClassName} `}>
      {children}
    </div>
  )
}

export const Hero = Object.assign(HeroContainer, {
  Image: HeroImage,
  Body: HeroBody,
})

HeroContainer.displayName = 'Hero'
;(HeroImage as React.FC).displayName = 'Hero.Image'
;(HeroBody as React.FC).displayName = 'Hero.Body'
