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
    case 'cloudinary-folder':
      return <CloudinaryGallery path={props.data.folderName} />;
    case 'partners-list':
      return <PartnersList locale={props.locale} />;
    case 'hero':
      return (
        <Hero
          id={props.data.id}
          title={props.data.title}
          description={props.data.description}
          rounded={props.data.rounded}
          shadow={props.data.shadow || true}
          image={props.data.image}
          link={props.data.link}
        />
      );
    case 'content-list':
      return (
        <ContentList
          type={props.data.contentType}
          title={props.data.title}
          locale={props.locale}
          pageSize={props.data.items}
        />
      );
    case 'form':
      return <Form data={props.data} locale={props.locale} />;
    default:
      return <></>;
  }
};

//   form: <Form data={props.blockContent.data} />,
//   buttonGroup: <ButtonGroup content={props.blockContent} />,
