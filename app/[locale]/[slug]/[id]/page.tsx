import { Content, ErrorState } from '@/components';
import { SITE } from '@/constants';
import { getSingleEvent } from '@/services/events';
import { Heading, Section } from '@marceloglacial/brinca-ui';
import { Metadata } from 'next';

export async function generateMetadata(
  props: PageParamsType
): Promise<Metadata> {
  const params = await props.params;
  const result = await getSingleEvent(params.slug, params.id, params.locale);

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
  const result = await getSingleEvent(params.slug, params.id, params.locale);

  if (result.status === 'error') return <ErrorState message={result.message} />;

  const event = result.data;

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{event.title}</h1>
      </Heading>
      <Content items={event.blocks} />
    </Section>
  );
}
