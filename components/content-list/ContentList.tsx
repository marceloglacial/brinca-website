import { CardGrid } from '@/components';
import { getPageDataBySlug } from '@/services';
import { FC } from 'react';

export const ContentList: FC<ContentListProps> = async ({
  data,
  locale,
}): Promise<JSX.Element> => {
  const result = await getPageDataBySlug(data.type, locale, 'date');

  if (result.status === 'error') return <>{result.message}</>;

  const content = result.data;
  const items = content.map((item: CardGridItemType): CardGridItemType => {
    return {
      id: item.id,
      link: `${data.type}/${item.slug}`,
      slug: item.slug,
      title: item.title,
      image: item.image,
      date: item.date,
    };
  });

  const hasTitle = Object.values(data.title || {}).some((value) => value);

  return (
    <CardGrid
      title={hasTitle ? data.title : undefined}
      items={items}
      locale={locale}
    />
  );
};
