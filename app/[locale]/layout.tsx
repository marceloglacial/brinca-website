import { NavBar } from '@/components'
import { SITE } from '@/constants'
import { getMenus } from '@/lib'
import { Layout } from '@/components/ui'
import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import '../globals.css'

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
  const params = await props.params
  const result = await getMenus(params.locale)
  const menu = result.data?.[0]?.items

  return (
    <html lang={params.locale}>
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
