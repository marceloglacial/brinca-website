import styles from './HeroStyles'

export interface HeroImageProps {
  children: React.ReactNode
  shadow?: boolean
  rounded?: boolean
}

const HeroImage = (props: HeroImageProps) => {
  const shadowStyles = props.shadow ? styles.shadow : ''
  const roundedStyles = props.rounded ? styles.rounded : ''

  return (
    <figure className={`${styles.figure} ${shadowStyles} ${roundedStyles} `}>
      {props.children}
    </figure>
  )
}
export default HeroImage
