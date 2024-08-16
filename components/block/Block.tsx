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
} from '@/components';

export const Block: FC<BlockProps> = (props): JSX.Element => {
  // console.log(props.data);

  switch (props.data.type) {
    case 'text-editor':
      return <RichText content={props.data.content} />;
    case 'embed':
      return <Embed url={props.data.url} type={props.data.embedType} />;
    case 'content-list':
      return (
        <ContentList
          type={props.data.contentType}
          title={props.data.title}
          locale={props.locale}
          pageSize={props.data.items}
        />
      );
    default:
      return <></>;
  }
  // const blockType: BlockType = {
  //   hero: (
  //     <Hero
  //       id={props.blockContent.id}
  //       title={props.blockContent.data.title}
  //       description={props.blockContent.data.description}
  //       image={props.blockContent.data.image}
  //       link={props.blockContent.data.link}
  //       rounded={props.blockContent.data.rounded}
  //       shadow={props.blockContent.data.shadow}
  //     />
  //   ),
  //   contentList: (
  //     <ContentList
  //       type={props.blockContent.data?.type}
  //       title={props.blockContent.data?.title}
  //     />
  //   ),
  //   form: <Form data={props.blockContent.data} />,
  //   richText: <RichText content={props.blockContent.data?.content} />,
  //   cloudinaryGallery: (
  //     <CloudinaryGallery path={props.blockContent.data?.path} />
  //   ),
  //   partnersList: <PartnersList />,
  //   buttonGroup: <ButtonGroup content={props.blockContent} />,
  // };

  // return (
  //   <div className='block' key={props.blockContent.id}>
  //     {blockType[props.blockContent.type]}
  //   </div>
  // );
};
