import { FC } from 'react';
import {
  ButtonGroup,
  CloudinaryGallery,
  ContentList,
  Embed,
  Form,
  Hero,
  PartnersList,
  RichText,
  Sponsors,
} from '@/components';

export const Block: FC<BlockProps> = (props): JSX.Element => {
  if (!props.content) return <></>;

  let block;
  switch (props.content.type) {
    case 'hero':
      block = <Hero {...props.content.value} />;
      break;
    case 'sponsors':
      block = <Sponsors data={props.content.value} locale={props.locale} />;
      break;
    case 'youtube':
      block = <Embed url={props.content.value} type={props.content.type} />;
      break;
    case 'content':
      block = <RichText content={props.content.value} />;
      break;
    case 'cloudinary_folder':
      block = <CloudinaryGallery path={props.content.value} />;
      break;
    case 'content_list':
      block = <ContentList data={props.content.value} locale={props.locale} />;
      break;
    case 'partners_list':
      block = <PartnersList />;
      break;
    case 'form_id':
      block = <Form id={props.content.value} />;
      break;
    case 'button_group':
      block = <ButtonGroup content={props.content.value} />;
      break;
    default:
      block = <></>;
  }

  return <>{block && <div className='block'>{block}</div>}</>;
};
