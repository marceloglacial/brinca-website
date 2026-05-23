import EventsList from './EventsList'

type Props = {
  block: {
    blockType: 'eventsListBlock'
    title?: string | null
    limit?: number | null
  }
  locale: string
}

export default function EventsListBlockComponent({ block, locale }: Props) {
  return <EventsList locale={locale} title={block.title ?? undefined} limit={block.limit ?? undefined} />
}
