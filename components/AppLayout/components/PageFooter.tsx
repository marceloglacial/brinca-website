import { default as NextLink } from 'next/link'
import { Link, NavBar } from '@marceloglacial/brinca-ui'
import { Logo } from 'components'
import { styles } from './PageFooterStyles'
import { navItem } from '../AppLayout'
import { FC } from 'react'

export interface PageFooterProps {
    navigation: navItem[]
}

const PageFooter: FC<PageFooterProps> = ({ navigation }): JSX.Element => {
    const hasNavItems = navigation?.length > 0
    return (
        <NavBar variant='bottom'>
            <NavBar.Brand>
                <NextLink href='#' className={styles.logo}>
                    <Logo variant='white' />
                </NextLink>
            </NavBar.Brand>
            {hasNavItems && (
                <NavBar.Items variant='bottom'>
                    {navigation.map((navitem, index) => (
                        <Link variant='white' key={index}>
                            <NextLink href={navitem.href}>
                                {navitem.text}
                            </NextLink>
                        </Link>
                    ))}
                </NavBar.Items>
            )}
        </NavBar>
    )
}
export default PageFooter
