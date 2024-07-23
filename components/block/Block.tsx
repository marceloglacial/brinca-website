import { FC } from 'react';
import { CloudinaryGallery, ContentList, Form, RichText } from '@/components';

export const Block: FC<BlockProps> = (props): JSX.Element => {
  const blockType: BlockType = {
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
      <CloudinaryGallery path={props.blockContent.data.path} />
    ),
  };

  return (
    <div key={props.blockContent.id}>{blockType[props.blockContent.type]}</div>
  );
};
