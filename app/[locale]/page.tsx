import { Block, ErrorState, Motion } from '@/components';
import { getHomePage } from '@/services';
import { formatFrontPageData } from '@/utils';
import { Section } from '@marceloglacial/brinca-ui';

export default async function Home({ params }: PageParamsType) {
  const response = await getHomePage(params.locale);

  if ('error' in response) return <ErrorState data={response} />;

  const homePageData = formatFrontPageData(response);

  return (
    <main className='main'>
      <Section spacing='xl'>
        {homePageData.map((item: any, index: number) => {
          return (
            <Motion key={index}>
              <Block data={item} locale={params.locale} />
            </Motion>
          );
        })}
      </Section>
    </main>
  );
}
