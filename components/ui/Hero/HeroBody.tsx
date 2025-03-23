import styles from './HeroStyles'

export interface HeroBodyProps {
  children: React.ReactNode
}

const HeroBody = (props: HeroBodyProps) => {
  return <figure className={`${styles.body} `}>{props.children}</figure>
}
export default HeroBody
