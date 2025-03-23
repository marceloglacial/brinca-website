import { LocaleList, Logo } from '@/components'
import { NavBar as NavBarUi } from '@/components/ui'
import Link from 'next/link'
import { FC } from 'react'
import { NavBarItems } from './NavBarItems'

export const NavBar: FC<NavBarUiProps> = ({ variant = 'top', items }) => {
  const componentStyles = variant === 'bottom' ? 'white' : undefined
  return (
    <NavBarUi variant={variant}>
      <NavBarUi.Brand>
        <Link href={'/'} aria-label='Home'>
          <Logo variant={componentStyles} />
        </Link>
      </NavBarUi.Brand>
      <NavBarItems variant={variant} items={items} localeList={<LocaleList />} />
    </NavBarUi>
  )
}
