import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import { Layout } from '@marceloglacial/brinca-ui';
import { NavBar } from '@/components';
import { getMenus } from '@/services';
import '../globals.css';
import { SITE } from '@/constants';

const inter = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${SITE.NAME} - ${SITE.DESCRIPTION}`,
  description: SITE.DESCRIPTION,
};

export default async function RootLayout(props: Readonly<PageProps>) {
  const params = await props.params;

  const {
    children
  } = props;

  const menuData = await getMenus();
  const menu = menuData.data[0].locales[params.locale];
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <div className='lg:px-8'>
          <Layout
            header={<NavBar items={menu} />}
            footer={<NavBar items={menu} variant='bottom' />}
          >
            {children}
          </Layout>
        </div>{' '}
      </body>
    </html>
  );
}
