import Link from 'next/link'
import { formatDate } from '@/lib/formatDate'
import SectionHeading from './SectionHeading'

type Item = {
  id: string
  href: string
  thumbnail?: string | null
  title: string
  date: string
}

export default function CollectionGridSection({
  items,
  locale,
  title,
}: {
  items: Item[]
  locale: string
  title?: string
}) {
  if (items.length === 0) return null

  return (
    <section className="space-y-3 md:space-y-4">
      {title && <SectionHeading title={title} />}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.id} href={item.href} className="block h-full">
            <article className="flex h-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-transform duration-200 hover:-translate-y-1">
              {item.thumbnail ? (
                <figure className="relative aspect-[4/3] h-56 overflow-hidden md:h-64">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover object-top"
                  />
                </figure>
              ) : null}

              <div className="space-y-3 p-6 md:space-y-4 md:p-8">
                <p className="text-xl font-bold">{item.title}</p>
                <p className="m-0 first-letter:uppercase">
                  {formatDate(item.date, locale, {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
