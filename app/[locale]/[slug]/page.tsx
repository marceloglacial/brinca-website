import { Content } from '@/components';
import { getSinglePage } from '@/services';
import { getCollectionById } from '@/services/firebase';
import { Heading, Section } from '@marceloglacial/brinca-ui';

export default async function Page({ params }: PageParamsType) {
  const data = await getSinglePage(params.locale, params.slug || '');
  const pageData = data.data;
  const language = params.locale;

  const pageResult = await getCollectionById('pages');

  console.log(pageResult);

  if (!pageData) {
    console.error(data.error);
    return <h1>Page Not found</h1>;
  }

  return (
    <Section>
      <Heading className='mb-4'>
        <h1>{pageData.title[language]}</h1>
      </Heading>
      <Content items={pageData.content} language={language} />
    </Section>
  );
}
