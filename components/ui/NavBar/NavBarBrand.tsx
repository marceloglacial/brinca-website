import styles from './NavBarStyles'

export interface NavBarBrandProps {
  children: React.ReactNode
}

const NavBarBrand = (props: NavBarBrandProps & React.JSX.IntrinsicElements['div']) => {
  const { children } = props
  return (
    <div {...props} className={`${styles.brand} `}>
      {children}
    </div>
  )
}

export default NavBarBrand
