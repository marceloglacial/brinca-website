import CalendarList from './CalendarList'

type Props = {
  block: {
    blockType: 'calendarsListBlock'
    title?: string | null
    limit?: number | null
  }
  locale: string
}

export default function CalendarsListBlockComponent({ block, locale }: Props) {
  return <CalendarList locale={locale} title={block.title ?? undefined} limit={block.limit ?? undefined} />
}
