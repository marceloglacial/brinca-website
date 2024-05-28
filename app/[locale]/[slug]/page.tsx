import { CardGrid } from '@/components';
import { getPages, getSinglePage } from '@/services';
import { Heading, Section } from '@marceloglacial/brinca-ui';

export default async function Page({ params }: { params: PageParamsProps }) {
  const data = await getSinglePage(params.locale, params.slug || '');
  const pageData = data.data[0];

  if (!pageData || !params.slug) return <h1>Page Not found</h1>;

  const language = params.locale;

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{pageData.title[language]}</h1>
      </Heading>
      <Section
        dangerouslySetInnerHTML={{ __html: pageData.content[language] }}
      />
    </Section>
  );
}
