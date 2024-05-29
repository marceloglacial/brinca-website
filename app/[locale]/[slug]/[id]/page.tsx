import { getData } from '@/services';
import { Heading, Section } from '@marceloglacial/brinca-ui';

export default async function Page({ params }: { params: PageParamsProps }) {
  const data = await getData('pages', params.id, params.locale);
  const pageData = data.data[0];

  if (!pageData) return <h1>Not found</h1>;

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{pageData.title}</h1>
      </Heading>
      <Section dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </Section>
  );
}
