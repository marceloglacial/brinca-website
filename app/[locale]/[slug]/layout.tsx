import { SITE } from '@/constants';
import { getSinglePage } from '@/services';
import { Metadata } from 'next';

export async function generateMetadata(props: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const params = await props.params;
  const result = await getSinglePage(params.locale, params.slug);

  if (result.status === 'error') {
    return { title: SITE.NAME };
  }

  const content = result.data;
  return {
    title: `${SITE.NAME} - ${content.title}`,
  };
}

export default async function RootLayout({ children }: Readonly<PageProps>) {
  return <>{children}</>;
}
