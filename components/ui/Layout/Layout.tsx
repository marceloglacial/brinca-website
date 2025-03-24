import styles from './LayoutStyles'

interface LayoutProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

export const Layout = (props: LayoutProps) => {
  const { header, footer, children } = props
  return (
    <div className={`${styles.container}`}>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  )
}
