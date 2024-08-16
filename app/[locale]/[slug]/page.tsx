import { Content } from '@/components';
import { getSinglePage } from '@/services';
import { formatData } from '@/utils';
import { Heading, Section } from '@marceloglacial/brinca-ui';

export default async function Page({ params }: PageParamsType) {
  const data = await getSinglePage(params.locale, params.slug || '');

  if ('error' in data) {
    console.error(data.error);
    return <h1>{data.error.message}</h1>;
  }

  const pageData = formatData(data);

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{pageData.title}</h1>
      </Heading>
      <Content locale={pageData.locale} items={pageData.content} />
    </Section>
  );
}
