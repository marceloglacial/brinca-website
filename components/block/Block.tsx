import { FC } from 'react';
import {
  CloudinaryGallery,
  ContentList,
  Embed,
  PartnersList,
  RichText,
} from '@/components';

export const Block: FC<BlockProps> = (props): JSX.Element => {
  if (!props.content) return <></>;

  const blockType: any = {
    youtube: <Embed url={props.content.value} type={props.content.type} />,
    content: <RichText content={props.content.value} />,
    cloudinary_folder: <CloudinaryGallery path={props.content.value} />,
    content_list: (
      <ContentList data={props.content.value} locale={props.locale} />
    ),
    partners_list: <PartnersList />,
  };

  const block = blockType[props.content.type];

  return <>{block && <div className='block'>{block}</div>}</>;
};
