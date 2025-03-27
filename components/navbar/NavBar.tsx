import { Icon, LocaleList, Logo } from '@/components'
import { NavBar as NavBarUi } from '@/components/ui'
import Link from 'next/link'
import { FC } from 'react'
import { NavBarItems } from './NavBarItems'

export const NavBar: FC<NavBarUiProps> = ({ variant = 'top', items }) => {
  const isBottom = variant === 'bottom';
  const componentStyles = isBottom ? 'white' : undefined
  return (
    <NavBarUi variant={variant}>
      <NavBarUi.Brand>
        <Link href={'/'} aria-label='Home'>
          <Logo variant={componentStyles} />
        </Link>
        {isBottom && (
          <div className='pl-6 flex w-full justify-center gap-2 lg:justify-start'>
            <a href='https://www.instagram.com/brinca_ottawa/' target='_blank' rel='noreferrer'>
              <Icon variant='white' type='facebook' />
            </a>
            <a href='https://www.instagram.com/brinca_ottawa/' target='_blank' rel='noreferrer'>
              <Icon variant='white' type='instagram' />
            </a>
          </div>
        )}
      </NavBarUi.Brand>
      <NavBarItems variant={variant} items={items} localeList={<LocaleList />} />
    </NavBarUi>
  )
}
