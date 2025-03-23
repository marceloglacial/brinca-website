'use client'
import { Link, NavBar } from '@/components/ui'
import NextLink from 'next/link'
import { FC, useState } from 'react'

export const NavBarItems: FC<NavBarUiProps> = ({ variant, items, localeList }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isTop = variant === 'top' || undefined
  return (
    <div className={isTop ? `flex items-center ml-auto` : `hidden xl:flex ml-auto`}>
      <NavBar.Items variant={variant} isOpen={isOpen}>
        {items?.map((item, index) => {
          const linkType = item.type === 'link' ? undefined : item.type
          const componentStyles = variant === 'bottom' ? 'white' : linkType
          return (
            <NextLink onClick={() => setIsOpen(false)} href={`/${item.slug}`} key={index}>
              <Link variant={componentStyles}>{item.title}</Link>
            </NextLink>
          )
        })}
        <div className={`transform rotate-90 xl:rotate-0 ${isTop ? `` : `text-white`}`}>|</div>
        {localeList}
      </NavBar.Items>
      <NavBar.Button isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
