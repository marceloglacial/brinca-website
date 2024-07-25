import { Block } from '@/components';
import { getDataByType } from '@/services';
import { Section } from '@marceloglacial/brinca-ui';

export default async function Home({ params }: PageParamsType) {
  const data = await getDataByType('homepage');
  const pageData = data.data[0].content;

  return (
    <main className='main'>
      <Section spacing='xl'>
        {pageData.map((item: any, index: number) => {
          return (
            <Block
              key={index}
              blockLanguage={params.locale}
              blockContent={{
                id: index,
                type: item.type,
                data: item.data,
              }}
            />
          );
        })}
      </Section>
    </main>
  );
}
