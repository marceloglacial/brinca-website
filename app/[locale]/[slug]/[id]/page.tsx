import { Content } from '@/components';
import { getPageByType } from '@/services';
import { Heading, Section } from '@marceloglacial/brinca-ui';

export default async function Page({ params }: PageProps) {
  const data = await getPageByType(
    params.slug || '',
    params.locale,
    params.id || ''
  );
  const language = params.locale;
  const pageData = data.data;

  if (!pageData) return <h1>Not found</h1>;

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{pageData.title[language]}</h1>
      </Heading>
      <Content items={pageData.content} language={language} />
    </Section>
  );
}
