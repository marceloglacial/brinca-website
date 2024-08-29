import { Block, ErrorState } from '@/components';
import { getHomePage } from '@/services';
import { formatFrontPageData } from '@/utils';
import { Section } from '@marceloglacial/brinca-ui';

export default async function Home({ params }: PageParamsType) {
  const response = await getHomePage(params.locale);

  if ('error' in response) return <ErrorState data={response} />;

  const homePageData = formatFrontPageData(response);
  console.log(homePageData);

  return (
    <main className='main'>
      <Section spacing='xl'>
        {homePageData.map((item: any, index: number) => {
          return <Block key={index} data={item} locale={params.locale} />;
        })}
      </Section>
    </main>
  );
}
