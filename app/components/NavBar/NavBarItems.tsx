'use client'
import { FC } from 'react'
import { Link, LinkTypes, NavBar, NavBarTypes } from '@marceloglacial/brinca-ui'
import { default as NextLink } from 'next/link'

export type NavBarItemProps = {
    href: string
    text: string
    variant?: LinkTypes
}
export interface NavBarItemsProps {
    variant: NavBarTypes
    items: NavBarItemProps[]
}
const NavBarItems: FC<NavBarItemsProps> = ({
    variant = 'top',
    items,
}): JSX.Element | null => {
    if (!items.length) return null
    return (
        <NavBar.Items variant={variant}>
            {items.map((item, key) => {
                const isTopVariant = variant === 'top'
                const defaultVariant = isTopVariant ? 'default' : 'white'
                const linkVariant = isTopVariant ? item.variant : defaultVariant
                return (
                    <NextLink href={item.href} key={key}>
                        <Link variant={linkVariant}>{item.text}</Link>
                    </NextLink>
                )
            })}
        </NavBar.Items>
    )
}
export default NavBarItems
