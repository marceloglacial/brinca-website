import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'
import { Layout } from '@marceloglacial/brinca-ui'
import { PageFooter, PageHeader } from '@/components'

const defaultFont = Mulish({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Brinca',
    description: 'Brazil Canada Community Association',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className={defaultFont.className}>
                <Layout header={<PageHeader />} footer={<PageFooter />}>
                    {children}
                </Layout>
            </body>
        </html>
    )
}
