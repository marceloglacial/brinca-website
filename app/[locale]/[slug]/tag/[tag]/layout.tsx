import { COLLECTIONS, SITE } from '@/constants';
import { getDocumentBySlug, getSinglePage } from '@/services';
import { Metadata } from 'next';

export async function generateMetadata(props: {
  params: { slug: string; locale: string; tag: string };
}): Promise<Metadata> {
  const params = await props.params;

  const page = await getDocumentBySlug(
    COLLECTIONS.CATEGORIES,
    params.tag,
    params.locale
  );

  if (page.status === 'error')
    return {
      title: `${SITE.NAME}`,
    };

  return {
    title: `${SITE.NAME} - ${params.slug} - ${page.data.title[params.locale]}`,
  };
}

export default async function RootLayout({ children }: Readonly<PageProps>) {
  return <>{children}</>;
}
