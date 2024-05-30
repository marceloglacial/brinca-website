import { CardGrid } from '@/components';
import { getEvents } from '@/services';
import { FC } from 'react';

export const ContentList: FC<ContentListProps> = async ({
  language,
}): Promise<JSX.Element> => {
  const events = await getEvents();
  const allEvents = events.data.map((item: IPageData): CardGridItemType => {
    return {
      id: item.id,
      link: `events/${item.slug[language]}`,
      title: item.title[language],
      image: item.image,
    };
  });

  return <CardGrid items={allEvents} />;
};
