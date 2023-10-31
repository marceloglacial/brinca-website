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
                    <Link key={key} variant={linkVariant}>
                        <NextLink href={item.href}> {item.text}</NextLink>
                    </Link>
                )
            })}
        </NavBar.Items>
    )
}
export default NavBarItems
