import { FC } from 'react'
import { Link, NavBar } from '@marceloglacial/brinca-ui'
import { Logo } from 'components'
import { styles } from './PageHeaderStyles'
import { navItem } from '../AppLayout'
import { default as NextLink } from 'next/link'

export interface PageHeaderProps {
    navigation: navItem[]
}

const PageHeader: FC<PageHeaderProps> = ({ navigation }): JSX.Element => {
    const hasNavItems = navigation?.length > 0

    return (
        <NavBar>
            <NavBar.Brand>
                <NextLink href='/'>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                </NextLink>
            </NavBar.Brand>
            {hasNavItems && (
                <NavBar.Items>
                    {navigation.map((item: navItem) => {
                        const { id, href, text, type } = item
                        return (
                            <NextLink href={href} key={id}>
                                <Link variant={type}>{text}</Link>
                            </NextLink>
                        )
                    })}
                </NavBar.Items>
            )}
        </NavBar>
    )
}
export default PageHeader
