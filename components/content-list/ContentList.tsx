import { FC } from 'react';
import { CardGrid } from '@/components';
import { getContentByType } from '@/services';

export const ContentList: FC<ContentListProps> = async ({
  type,
  title,
  locale,
}): Promise<JSX.Element> => {
  const data = await getContentByType(type, locale);

  const items = data.data.map((item: IPageData): CardGridItemType => {
    return {
      id: item.id,
      link: `${type}/${item.attributes.slug}`,
      title: item.attributes.title,
      locale,
      image: item.attributes.thumbnail.data
        ? {
            src: item.attributes.thumbnail.data.attributes.url,
          }
        : null,
      date: item.attributes.date,
    };
  });

  return <CardGrid title={title && title} items={items} />;
};
