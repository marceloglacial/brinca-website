import { Block } from '@/components';
import { getHomePage } from '@/services';
import { formatFrontPageData } from '@/utils';
import { Section } from '@marceloglacial/brinca-ui';

export default async function Home({ params }: PageParamsType) {
  const response = await getHomePage(params.locale);
  const homePageData = formatFrontPageData(response);

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
