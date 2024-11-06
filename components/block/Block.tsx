import { FC } from 'react';
import { Embed, RichText } from '@/components';

export const Block: FC<BlockProps> = (props): JSX.Element => {
  if (!props.content) return <></>;

  const blockType: any = {
    youtube: <Embed url={props.content.value} type={props.content.type} />,
    content: <RichText content={props.content.value} />,
  };

  return <div className='block'>{blockType[props.content.type] || ''}</div>;
};
