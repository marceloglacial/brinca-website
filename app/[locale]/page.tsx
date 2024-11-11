import { Content, ErrorState } from '@/components';
import { getSinglePage } from '@/services';
import { Section } from '@marceloglacial/brinca-ui';

export default async function Page(props: PageParamsType) {
  const params = await props.params;
  const result = await getSinglePage('homepage', params.locale);

  if (result.status === 'error') return <ErrorState message={result.message} />;

  const content = result.data;

  return (
    <Section>
      <Content items={content.blocks} locale={params.locale} />
    </Section>
  );
}
