import { PageDocumentData, getData } from '@/services';
import { Card, Heading, Section } from '@marceloglacial/brinca-ui';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export interface PageListProps {
  title?: string;
  parent: PageParamsProps['slug'];
  locale: PageParamsProps['locale'];
}

export const PageList: FC<PageListProps> = async ({
  title,
  parent,
  locale,
}) => {
  const data = await getData('pages', undefined, locale);
  const content = data.data.filter(
    (item: PageDocumentData) => item.parent === parent
  );
  return (
    <Section>
      {title && <Heading>{title}</Heading>}
      <div className='grid grid-cols-3 gap-6'>
        {content.map((item: PageDocumentData) => (
          <Link key={item.id} href={`/${parent}/${item.slug}`}>
            <Card>
              {item.image && (
                <Card.Image>
                  <Image
                    alt='Hero Image'
                    className='w-full h-full object-cover'
                    src={item.image.src}
                    width={300}
                    height={300}
                  />
                </Card.Image>
              )}
              <Card.Body>
                <h4>{item.title}</h4>
                <p className=' line-clamp-3'>{item.content}</p>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
};
