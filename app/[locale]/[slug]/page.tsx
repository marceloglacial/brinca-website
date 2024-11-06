import { Content } from '@/components';
import { getSinglePage } from '@/services';
import { Heading, Section } from '@marceloglacial/brinca-ui';

export default async function Page(props: {
  params: { slug: string; locale: string };
}) {
  const params = await props.params;
  const result = await getSinglePage(params.locale, params.slug);

  if (result.status === 'error') return <>Error: {result.message}</>;

  const content = result.data;

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{content.title}</h1>
      </Heading>
      <Content items={content.blocks} />
    </Section>
  );
}
