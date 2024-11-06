import { COLLECTIONS, SITE } from '@/constants';
import { getPageByType } from '@/services';
import { Metadata } from 'next';

export async function generateMetadata(props: PageParamsType): Promise<Metadata> {
  const params = await props.params;
  const data = await await getPageByType(
    COLLECTIONS.PARTNERS_CATEGORY,
    params.locale,
    params.tag || ''
  );
  if (data.status === 'error')
    return {
      title: SITE.NAME,
    };

  const pageData = data.data;
  const language = params.locale;
  return {
    title: `${SITE.NAME} ${params.slug} - ${pageData.title[language]}`,
  };
}

export default async function RootLayout({ children }: Readonly<PageProps>) {
  return <>{children}</>;
}
