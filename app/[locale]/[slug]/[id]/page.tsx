import { Content, ErrorState } from '@/components';
import { getContentBySlug } from '@/services';
import { formatData } from '@/utils';
import { Heading, Section } from '@marceloglacial/brinca-ui';

export default async function Page({ params }: PageParamsType) {
  const data = await getContentBySlug(params.slug, params.id, params.locale);

  if ('error' in data) return <ErrorState data={data} />;

  const pageData = formatData(data);

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{pageData.title}</h1>
      </Heading>
      <Content items={pageData.content} locale={params.locale} />
    </Section>
  );
}
