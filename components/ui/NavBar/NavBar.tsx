import NavBarBrand from './NavBarBrand'
import NavBarButton from './NavBarButton'
import NavBarItems from './NavBarItems'
import styles from './NavBarStyles'

export type NavBarTypes = 'top' | 'bottom'
export interface NavBarProps {
  variant?: NavBarTypes
  children: React.ReactNode
}

const NavBarContainer = (props: NavBarProps) => {
  const { variant = 'top', children } = props
  return (
    <nav {...props} className={`${styles.container} ${styles[variant]} `}>
      {children}
    </nav>
  )
}

export const NavBar = Object.assign(NavBarContainer, {
  Brand: NavBarBrand,
  Items: NavBarItems,
  Button: NavBarButton,
})

NavBarContainer.displayName = 'NavBar'
;(NavBarBrand as React.FC).displayName = 'NavBar.Brand'
;(NavBarItems as React.FC).displayName = 'NavBar.Items'
;(NavBarButton as React.FC).displayName = 'NavBar.Button'
