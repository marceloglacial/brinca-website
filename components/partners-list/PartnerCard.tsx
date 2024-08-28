import { FC } from 'react';
import { Card } from '@marceloglacial/brinca-ui';
import { Icon } from '@/components';
import Image from 'next/image';

const PartnerCard: FC<PartnerType> = (props): JSX.Element => {
  if (!props.isActive) return <></>;

  return (
    <Card>
      <Card.Body className='text-center lg:text-left'>
        <div className='flex flex-wrap lg:flex-nowrap gap-4 justify-center lg:justify-start'>
          {props.logo.url && (
            <figure className='w-auto h-[200px] md:h-[100px] relative aspect-square'>
              <Image
                alt={props.logo?.alternativeText || `${props.title}'s logo`}
                src={props.logo.url}
                sizes='200px 200px'
                fill
                className='object-contain'
              />
            </figure>
          )}
          <div className='w-full text-center md:text-left'>
            <h4 className='text-[20px]'>{props.title}</h4>
            {props.description && (
              <p className='text-[1rem] leading-normal'>{props.description}</p>
            )}
          </div>
        </div>
        <div className='w-full text-center md:text-left'>
          <address>
            <div>{props.address}</div>
            <div>
              <a href={props.website} target='_blank'>
                {props.website}
              </a>
            </div>
            <div>
              <a href={`mailto:${props.email}`}>{props.email}</a>
            </div>
            <div>
              <a href={`tel:${props.phone}`}>{props.phone}</a>
            </div>
          </address>
        </div>
        <div className='w-full flex justify-center lg:justify-start gap-4'>
          {props.instagram && (
            <a href={props.instagram} target='_blank'>
              <Icon type='instagram' />
            </a>
          )}
          {props.facebook && (
            <a href={props.facebook} target='_blank'>
              <Icon type='facebook' />
            </a>
          )}
          {props.linkedin && (
            <a href={props.linkedin} target='_blank'>
              <Icon type='linkedin' />
            </a>
          )}
          {props.whatsapp && (
            <a href={props.whatsapp} target='_blank'>
              <Icon type='whatsapp' />
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
export default PartnerCard;
