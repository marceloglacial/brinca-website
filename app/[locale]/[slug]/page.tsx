import { Content, ErrorState } from '@/components';
import { SITE } from '@/constants';
import { getSinglePage } from '@/services';
import { Heading, Section } from '@marceloglacial/brinca-ui';
import { Metadata } from 'next';

export async function generateMetadata(
  props: PageParamsType
): Promise<Metadata> {
  const params = await props.params;
  const result = await getSinglePage(params.slug, params.locale);

  if (result.status === 'error')
    return {
      title: SITE.NAME,
    };

  const page = result.data;

  return {
    title: `${SITE.NAME} - ${page.title}`,
  };
}

export default async function Page(props: PageParamsType) {
  const params = await props.params;
  const result = await getSinglePage(params.slug, params.locale);

  if (result.status === 'error') return <ErrorState message={result.message} />;

  const content = result.data;

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{content.title}</h1>
      </Heading>
      <Content items={content.blocks} locale={params.locale} />
    </Section>
  );
}
