import { CardGrid } from '@/components';
import { getDataByType } from '@/services';
import { FC } from 'react';

export const ContentList: FC<ContentListProps> = async ({
  language,
  type,
  title,
}): Promise<JSX.Element> => {
  const events = await getDataByType(type);
  const allEvents = events.data.map((item: IPageData): CardGridItemType => {
    return {
      id: item.id,
      link: `${type}/${item.slug[language]}`,
      title: item.title[language],
      image: item.image,
    };
  });

  return <CardGrid title={title && title[language]} items={allEvents} />;
};
