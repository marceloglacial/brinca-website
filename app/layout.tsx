import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'
import { Layout } from '@marceloglacial/brinca-ui'
import { NavBar } from '@/components'
import { FC } from 'react'
import { NavBarItemProps } from '@/components/NavBar/NavBarItems'

const defaultFont = Mulish({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Brinca',
    description: 'Brazil Canada Community Association',
}

interface RootLayoutProps {
    children: React.ReactNode
}

const navbarItems: NavBarItemProps[] = [
    {
        href: '/',
        text: 'Home',
    },
    {
        href: '/',
        text: 'Item 1',
    },
    {
        href: '/',
        text: 'Item 2',
        variant: 'primary',
    },
]

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang='en'>
            <body className={defaultFont.className}>
                <Layout
                    header={<NavBar variant={'top'} items={navbarItems} />}
                    footer={<NavBar variant={'bottom'} items={navbarItems} />}
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}
export default RootLayout
