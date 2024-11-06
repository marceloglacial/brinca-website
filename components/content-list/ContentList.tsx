import { CardGrid, ErrorState } from '@/components';
import { getPageDataBySlug } from '@/services';
import { FC } from 'react';

export const ContentList: FC<ContentListProps> = async ({
  type,
  title,
}): Promise<JSX.Element> => {
  const data = await getPageDataBySlug(type);

  if (data.status === 'error') return <ErrorState message={data.message} />;

  const content = data.data;
  const items = content.map((item: CardGridItemType): CardGridItemType => {
    return {
      id: item.id,
      link: `${type}/${item.slug}`,
      slug: item.slug,
      title: item.title,
      image: item.image,
      date: item.date,
    };
  });

  return <CardGrid title={title && title} items={items} />;
};
