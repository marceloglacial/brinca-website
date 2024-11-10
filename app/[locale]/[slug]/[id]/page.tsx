import { Content, ErrorState } from '@/components';
import { getDocumentBySlug } from '@/services';
import { localizedContent } from '@/utils';
import { Heading, Section } from '@marceloglacial/brinca-ui';

export default async function Page(props: PageParamsType) {
  const params = await props.params;

  const result = await getDocumentBySlug(
    params.slug as string,
    params.id as string
  );

  if (result.status === 'error') return <ErrorState message={result.message} />;

  const event = localizedContent(result.data) as EventType;

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{event.title as string}</h1>
      </Heading>
      <Content items={event.blocks} />
    </Section>
  );
}
