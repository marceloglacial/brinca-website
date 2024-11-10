import { COLLECTIONS, SITE } from '@/constants';
import { getDocumentBySlug } from '@/services';
import { Metadata } from 'next';

export async function generateMetadata(
  props: PageParamsType
): Promise<Metadata> {
  const params = await props.params;

  const result = await getDocumentBySlug(
    COLLECTIONS.EVENTS,
    params.id as string
  );

  if (result.status === 'error')
    return {
      title: `${SITE.NAME}`,
    };

  return {
    title: `${SITE.NAME} - ${result.data.title[params.locale]}`,
  };
}

export default async function RootLayout({ children }: Readonly<PageProps>) {
  return <>{children}</>;
}
