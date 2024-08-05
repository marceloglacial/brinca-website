import { Card } from '@marceloglacial/brinca-ui';
import { FC } from 'react';
import { Icon } from '@/components';

const PartnerCard: FC<PartnersCard> = (props): JSX.Element => {
  return (
    <Card>
      <Card.Body className='text-center lg:text-left'>
        <div className='flex flex-wrap lg:flex-nowrap gap-8 justify-center lg:justify-start'>
          <figure className='w-[200px]'>
            <img
              alt={props.image.alt}
              className='w-[160px] h-[65px] md:w-[230px] md:h-[95px] object-contain'
              src={props.image.src}
            />
          </figure>
          <div className='w-full'>
            <h4 className='text-[20px]'>{props.title[props.locale]}</h4>
            {props.description && (
              <p className='text-[16px] leading-normal'>
                {props.description[props.locale]}
              </p>
            )}
          </div>
        </div>
        <div className='w-full'>
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
          {props.social.map((item, index) => (
            <a href={item.url} target='_blank' key={index}>
              <Icon type={item.type} />
            </a>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};
export default PartnerCard;
