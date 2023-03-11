import { FC, ReactNode } from 'react'
import styles from './SectionStyles'

export interface SectionProps {
    children: ReactNode
    spacing?: SpacingType
}

type SpacingType = 'none' | 'sm' | 'lg'

const Section: FC<SectionProps & JSX.IntrinsicElements['section']> = (
    props
): JSX.Element => {
    const { children, spacing = 'none' } = props
    return (
        <section
            {...props}
            className={`${styles.container} ${styles[spacing]}`}
        >
            {children}
        </section>
    )
}
export default Section
