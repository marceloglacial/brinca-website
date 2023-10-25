import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'

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
            <body className={defaultFont.className}>{children}</body>
        </html>
    )
}
