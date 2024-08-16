import { FC } from 'react';
import { CardGrid } from '@/components';
import { getContentByType } from '@/services';
import { formatData } from '@/utils';

export const ContentList: FC<ContentListProps> = async ({
  type,
  title,
  locale,
  pageSize = 12,
}): Promise<JSX.Element> => {
  const response = await getContentByType(type, locale, pageSize);

  if ('error' in response) return <>Error loading the page!</>;

  const items = response.data.map((item): CardGridItemType => {
    const content = formatData({ data: item });

    return {
      id: content.id,
      link: `${type}/${content.slug}`,
      title: content.title,
      locale,
      image: content.thumbnail,
      date: content.date,
    };
  });

  return <CardGrid title={title && title} items={items} />;
};
