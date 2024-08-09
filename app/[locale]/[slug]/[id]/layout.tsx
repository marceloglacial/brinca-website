import { SITE } from '@/constants';
import { getPageByType } from '@/services';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageParamsType): Promise<Metadata> {
  const data = await getPageByType(
    params.slug || '',
    params.locale,
    params.id || ''
  );

  const pageData = data.data;
  const language = params.locale;
  return {
    title: `${SITE.NAME} - ${pageData.title[language]}`,
  };
}

export default async function RootLayout({ children }: Readonly<PageProps>) {
  return <>{children}</>;
}
