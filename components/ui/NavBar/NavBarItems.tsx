import { NavBarTypes } from './NavBar'
import styles from './NavBarStyles'

export interface NavBarItemsProps {
  variant?: NavBarTypes
  isOpen?: boolean
  children: React.ReactNode
}

const NavBarItems = (props: NavBarItemsProps & React.JSX.IntrinsicElements['div']) => {
  const { variant = 'top', isOpen, children } = props
  return (
    <div
      className={`${styles.items.container} ${styles.items[variant]} ${isOpen ? styles.isOpen : styles.isClose}`}
    >
      {children}
    </div>
  )
}

export default NavBarItems
