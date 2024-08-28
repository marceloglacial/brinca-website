import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import { Layout } from '@marceloglacial/brinca-ui';
import { NavBar } from '@/components';
import { SITE } from '@/constants';
import '../globals.css';

const inter = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${SITE.NAME} - ${SITE.DESCRIPTION}`,
  description: SITE.DESCRIPTION,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<PageProps>) {
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <div className='lg:px-8'>
          <Layout
            header={<NavBar locale={params.locale} />}
            footer={<NavBar locale={params.locale} variant='bottom' />}
          >
            {children}
          </Layout>
        </div>
      </body>
    </html>
  );
}
