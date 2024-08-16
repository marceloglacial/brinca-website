import { SITE } from '@/constants';
import { getSinglePage } from '@/services';
import { formatData } from '@/utils';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageParamsType): Promise<Metadata> {
  const data = await getSinglePage(params.locale, params.slug || '');

  if ('error' in data)
    return {
      title: SITE.NAME,
    };

  const pageData = formatData(data);

  return {
    title: `${SITE.NAME} - ${pageData.title}`,
  };
}

export default async function RootLayout({ children }: Readonly<PageProps>) {
  return <>{children}</>;
}
