import { Content } from '@/components';
import { getContentBySlug, getPageByType } from '@/services';
import { formatData } from '@/utils';
import { Heading, Section } from '@marceloglacial/brinca-ui';

export default async function Page({ params }: PageParamsType) {
  const data = await getContentBySlug(params.slug, params.id, params.locale);

  if ('error' in data) {
    return <>{data.error.message}</>;
  }
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
