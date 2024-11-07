import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import { Layout } from '@marceloglacial/brinca-ui';
import { NavBar } from '@/components';
import { getMenus } from '@/services';
import { SITE } from '@/constants';
import '../globals.css';

const inter = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${SITE.NAME} - ${SITE.DESCRIPTION}`,
  description: SITE.DESCRIPTION,
};

export default async function RootLayout(props: Readonly<PageProps>) {
  const params = await props.params;
  const result = await getMenus(params.locale);

  const menu = result.status === 'error' ? [] : result.data[0]?.items;

  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <div className='lg:px-8'>
          <Layout
            header={<NavBar items={menu} />}
            footer={<NavBar items={menu} variant='bottom' />}
          >
            {props.children}
          </Layout>
        </div>{' '}
      </body>
    </html>
  );
}
