import { SITE } from '@/constants';
import { getSinglePage } from '@/services';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageParamsType): Promise<Metadata> {
  const data = await getSinglePage(params.locale, params.slug || '');
  if (data.status === 'error')
    return {
      title: SITE.NAME,
    };

  const pageData = data.data;
  const language = params.locale;
  return {
    title: `${SITE.NAME} - ${pageData.title[language]}`,
  };
}

export default async function RootLayout({ children }: Readonly<PageProps>) {
  return <>{children}</>;
}
