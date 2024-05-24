import { PageList } from '@/components';
import { getData } from '@/services';
import { Heading, Section } from '@marceloglacial/brinca-ui';

export default async function Page({ params }: { params: PageParamsProps }) {
  const data = await getData('pages', params.slug, params.locale);
  const content = data.data[0];

  if (!content) return <h1>Not found</h1>;

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{content.title}</h1>
      </Heading>
      <Section dangerouslySetInnerHTML={{ __html: content.content }} />
      <PageList parent={params.slug} locale={params.locale} />
    </Section>
  );
}
