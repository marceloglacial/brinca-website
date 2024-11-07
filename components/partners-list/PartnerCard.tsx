'use client';
import { Card } from '@marceloglacial/brinca-ui';
import { FC } from 'react';
import { Icon } from '@/components';
import Image from 'next/image';
import { localizedContent } from '@/utils';
import { useParams } from 'next/navigation';

const PartnerCard: FC<PartnerTypeLocalized> = (props): JSX.Element => {
  const params = useParams();
  const content: PartnerType = localizedContent(props, params.locale as string);

  return (
    <Card>
      <Card.Body className='text-center lg:text-left'>
        <div className='flex flex-wrap lg:flex-nowrap gap-4 justify-center lg:justify-start'>
          {content.image && (
            <figure className='w-auto h-[200px] md:h-[100px] relative aspect-square'>
              <Image
                alt={content.title}
                src={content.image}
                sizes='200px 200px'
                fill
                className='object-contain'
              />
            </figure>
          )}
          <div className='w-full text-center md:text-left'>
            <h4 className='text-[20px]'>{content.title}</h4>
            {content.description && (
              <p className='text-[1rem] leading-normal'>
                {content.description}
              </p>
            )}
          </div>
        </div>
        <div className='w-full text-center md:text-left'>
          <address>
            <div>{content.address}</div>
            {content.website && (
              <div>
                <a href={content.website} target='_blank'>
                  {content.website}
                </a>
              </div>
            )}
            <div>
              <a href={`mailto:${content.email}`}>{content.email}</a>
            </div>
            <div>
              <a href={`tel:${content.phone}`}>{content.phone}</a>
            </div>
          </address>
        </div>
        <div className='w-full flex justify-center lg:justify-start gap-4'>
          {content.social?.map((item, index) => {
            return (
              <a href={item.url} target='_blank' key={index}>
                <Icon type={item.type} />
              </a>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
};
export default PartnerCard;
