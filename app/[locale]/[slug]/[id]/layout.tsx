import { SITE } from '@/constants';
import { getContentBySlug, getPageByType } from '@/services';
import { formatData } from '@/utils';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageParamsType): Promise<Metadata> {
  const data = await getContentBySlug(params.slug, params.id, params.locale);

  if ('error' in data)
    return {
      title: `${SITE.NAME} - ${data.error.message}`,
    };

  return {
    title: `${SITE.NAME} - ${formatData(data).title}`,
  };
}

export default async function RootLayout({ children }: Readonly<PageProps>) {
  return <>{children}</>;
}
