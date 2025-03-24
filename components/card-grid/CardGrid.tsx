import { formatDate } from '@/utils'
import { Card, Heading, Section } from '@/components/ui'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Animation } from '../animation/Animation'

export const CardGrid: FC<CardGridProps> = ({ title, items, locale }) => {
  return (
    <Section>
      {title && (
        <Heading>
          <h2>{title}</h2>
        </Heading>
      )}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {items.map((item, index) => {
          const formatedDate = item.date ? formatDate(item.date, locale) : ''

          return (
            <Animation key={index}>
              <Link href={`/${item.link}`}>
                <Card>
                  {item.image && (
                    <Card.Image>
                      <Image
                        alt='Hero Image'
                        className='h-full w-full object-cover'
                        src={item.image}
                        width={300}
                        height={300}
                      />
                    </Card.Image>
                  )}
                  <Card.Body>
                    <p className='text-xl font-bold'>{item.title}</p>
                    {item.content && <p className='line-clamp-3'>{item.content}</p>}
                    {formatedDate && <p className='first-letter:uppercase'>{formatedDate}</p>}
                  </Card.Body>
                </Card>
              </Link>
            </Animation>
          )
        })}
      </div>
    </Section>
  )
}
