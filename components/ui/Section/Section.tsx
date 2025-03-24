import styles from './SectionStyles'

export interface SectionProps {
  children: React.ReactNode
  spacing?: 's' | 'm' | 'l' | 'xl'
}

export const Section = (props: SectionProps) => {
  return (
    <section className={`${styles.container} ${styles[props.spacing || 's']} `}>
      {props.children}
    </section>
  )
}
