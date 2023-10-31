import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'
import { Layout } from '@marceloglacial/brinca-ui'
import { NavBar } from '@/components'
import { FC } from 'react'

const defaultFont = Mulish({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Brinca',
    description: 'Brazil Canada Community Association',
}

interface RootLayoutProps {
    children: React.ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang='en'>
            <body className={defaultFont.className}>
                <Layout
                    header={<NavBar variant={'top'} items={[]} />}
                    footer={<NavBar variant={'bottom'} items={[]} />}
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}
export default RootLayout
