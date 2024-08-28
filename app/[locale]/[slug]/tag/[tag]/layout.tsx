import { COLLECTIONS, DICTIONARY, SITE } from '@/constants';
import { getContentBySlug } from '@/services';
import { normalizeData } from '@/utils';
import { Heading, Section } from '@marceloglacial/brinca-ui';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: PageParamsType): Promise<Metadata> {
  const data = await getData({ params });

  if ('error' in data)
    return {
      title: `${SITE.NAME} - ${data.error.message}`,
    };

  return {
    title: `${SITE.NAME} - ${data.title}`,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<PageProps>) {
  const data = await getData({ params });

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>
          {DICTIONARY.PARTNETS_TITLE[params.locale]} - {data.title}
        </h1>
      </Heading>
      <div>{children}</div>;
    </Section>
  );
}

const getData = async ({ params }: PageParamsType) => {
  const data = await getContentBySlug(
    COLLECTIONS.PARTNERS_CATEGORY,
    params.tag,
    params.locale
  );
  const pageData = normalizeData(data);
  return pageData;
};
