import { NavBar } from '@/components'
import { COLLECTIONS, SITE } from '@/constants'
import { Layout } from '@/components/ui'
import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import '../globals.css'
import { getCollection } from '@/lib/api'
import { PageProps } from '@/types/page'

const inter = Mulish({ subsets: ['latin'] })

export async function generateMetadata({
  params: rawParams,
}: {
  params: Promise<{ locale: LocalesType }>
}): Promise<Metadata> {
  const params = await rawParams
  return {
    title: `${SITE.NAME} - ${SITE.DESCRIPTION[params.locale]}`,
    description: SITE.DESCRIPTION[params.locale],
    alternates: {
      canonical: `/${params.locale}`,
    },
  }
}

export default async function RootLayout(props: Readonly<PageProps>) {
  const { locale } = await props.params
  const result = await getCollection(COLLECTIONS.MENUS, { locale })
  const menu = result.data?.[0]?.items as MenuItemType[]

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div className='lg:px-8'>
          <Layout
            header={<NavBar items={menu} />}
            footer={<NavBar items={menu} variant='bottom' />}
          >
            <main className='main'>{props.children}</main>
          </Layout>
        </div>
      </body>
    </html>
  )
}
