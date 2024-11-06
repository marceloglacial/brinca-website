import { FC } from 'react';
import { Card, Heading, Section } from '@marceloglacial/brinca-ui';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils';

export const CardGrid: FC<CardGridProps> = ({ title, items }) => {
  return (
    <Section>
      {title && (
        <Heading>
          <h2>{title}</h2>
        </Heading>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {items.map((item) => {
          const formatedDate = item.date ? formatDate(item.date, 'en') : '';

          return (
            <Link key={item.id} href={`/${item.link}`}>
              <Card>
                {item.image && (
                  <Card.Image>
                    <Image
                      alt='Hero Image'
                      className='w-full h-full object-cover'
                      src={item.image}
                      width={300}
                      height={300}
                    />
                  </Card.Image>
                )}
                <Card.Body>
                  <p className=' text-xl font-bold'>{item.title}</p>
                  {item.content && (
                    <p className=' line-clamp-3'>{item.content}</p>
                  )}
                  {formatedDate && (
                    <p className=' first-letter:uppercase'>{formatedDate}</p>
                  )}
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </div>
    </Section>
  );
};
