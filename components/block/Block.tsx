import { FC } from 'react';
import { ContentList, RichText } from '@/components';

export const Block: FC<BlockProps> = (props): JSX.Element => {
  const blockType: BlockType = {
    contentList: (
      <ContentList
        type={props.blockContent.content.type}
        language={props.blockLanguage}
      />
    ),
    photoGallery: <>Photo Gallery</>,
    richText: (
      <RichText
        content={props.blockContent.content}
        language={props.blockLanguage}
      />
    ),
  };

  return (
    <div key={props.blockContent.id}>{blockType[props.blockContent.type]}</div>
  );
};
