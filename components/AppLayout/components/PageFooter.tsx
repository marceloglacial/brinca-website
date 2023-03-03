import { default as NextLink } from 'next/link'
import { Link, NavBar } from '@marceloglacial/brinca-ui'
import { Logo } from 'components'
import { styles } from './PageFooterStyles'

const PageFooter = () => (
    <NavBar variant='bottom'>
        <NavBar.Brand>
            <NextLink href='#' className={styles.logo}>
                <Logo variant='white' />
            </NextLink>
        </NavBar.Brand>
        <NavBar.Items variant='bottom'>
            <Link variant='white'>
                <NextLink href='#'>Item</NextLink>
            </Link>
            <Link variant='white'>
                <NextLink href='#'>Item</NextLink>
            </Link>
            <Link variant='white'>
                <NextLink href='#'>Item</NextLink>
            </Link>
            <Link variant='white'>
                <NextLink href='#'>Item</NextLink>
            </Link>
            <Link variant='white'>
                <NextLink href='#'>Item</NextLink>
            </Link>
        </NavBar.Items>
    </NavBar>
)
export default PageFooter
