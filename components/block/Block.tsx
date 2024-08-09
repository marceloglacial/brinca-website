import { FC } from 'react';
import {
  ButtonGroup,
  CloudinaryGallery,
  ContentList,
  Form,
  Hero,
  PartnersList,
  RichText,
} from '@/components';

export const Block: FC<BlockProps> = (props): JSX.Element => {
  const blockType: BlockType = {
    hero: (
      <Hero
        id={props.blockContent.id}
        language={props.blockLanguage}
        title={props.blockContent.data.title}
        description={props.blockContent.data.description}
        image={props.blockContent.data.image}
        link={props.blockContent.data.link}
        rounded={props.blockContent.data.rounded}
        shadow={props.blockContent.data.shadow}
      />
    ),
    contentList: (
      <ContentList
        type={props.blockContent.data?.type}
        title={props.blockContent.data?.title}
        language={props.blockLanguage}
      />
    ),
    form: (
      <Form language={props.blockLanguage} data={props.blockContent.data} />
    ),
    richText: (
      <RichText
        content={props.blockContent.data?.content}
        language={props.blockLanguage}
      />
    ),
    cloudinaryGallery: (
      <CloudinaryGallery path={props.blockContent.data?.path} />
    ),
    partnersList: <PartnersList language={props.blockLanguage} />,
    buttonGroup: (
      <ButtonGroup locale={props.blockLanguage} content={props.blockContent} />
    ),
  };

  return (
    <div className='block' key={props.blockContent.id}>
      {blockType[props.blockContent.type]}
    </div>
  );
};
