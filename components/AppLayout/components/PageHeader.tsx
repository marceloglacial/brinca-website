import { default as NextLink } from 'next/link'
import { Link, NavBar } from '@marceloglacial/brinca-ui'
import { Logo } from 'components'
import { styles } from './PageHeaderStyles'

const PageHeader = () => (
    <NavBar>
        <NavBar.Brand>
            <NextLink href='/'>
                <div className={styles.logo}>
                    <Logo />
                </div>
            </NextLink>
        </NavBar.Brand>
        <NavBar.Items>
            <Link>
                <NextLink href='#'>Item 1</NextLink>
            </Link>
            <Link>
                <NextLink href='#'>Item 2</NextLink>
            </Link>
            <Link>
                <NextLink href='#'>Item 3</NextLink>
            </Link>
            <Link>
                <NextLink href='#'>Item 4</NextLink>
            </Link>
            <Link>
                <NextLink href='#'>Item 5</NextLink>
            </Link>
            <Link>
                <NextLink href='#'>Item 6</NextLink>
            </Link>
            <Link variant='primary'>
                <NextLink href='#'>Item 7</NextLink>
            </Link>
        </NavBar.Items>
    </NavBar>
)
export default PageHeader
