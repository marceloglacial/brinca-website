import { Block } from '@/components';
import { getDataByType, getPageByType } from '@/services';
import { Hero, Section } from '@marceloglacial/brinca-ui';

export default async function Home({ params }: PageParamsType) {
  const data = await getDataByType('homepage');
  const pageData = data.data[0].content;

  return (
    <main className='main'>
      <Section spacing='xl'>
        {pageData.map((item: any, index: number) => {
          return (
            <div key={index}>
              <Block
                blockLanguage={params.locale}
                blockContent={{
                  id: index.toString(),
                  type: item.type,
                  data: item.data,
                }}
              />
            </div>
          );
        })}
      </Section>
    </main>
  );
}
