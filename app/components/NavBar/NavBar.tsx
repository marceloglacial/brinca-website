'use client'
import { FC } from 'react'
import { NavBar as NavbarBrinca, NavBarTypes } from '@marceloglacial/brinca-ui'
import NavBarItems, { NavBarItemProps } from './NavBarItems'
import { Logo, LogoProps } from '@/components'

export interface NavBarProps {
    variant: NavBarTypes
    items?: NavBarItemProps[]
}
export const NavBar: FC<NavBarProps> = ({
    variant = 'top',
    items,
}): JSX.Element => {
    const logoProps: LogoProps = {
        variant: variant === 'top' ? 'default' : 'white',
        size: variant === 'top' ? 'large' : 'small',
    }

    return (
        <NavbarBrinca variant={variant}>
            <NavbarBrinca.Brand>
                <Logo {...logoProps} />
            </NavbarBrinca.Brand>
            {items && <NavBarItems items={items} variant={variant} />}
        </NavbarBrinca>
    )
}
export default NavBar
