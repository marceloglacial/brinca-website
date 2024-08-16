import { FC } from 'react';

export const VideoWrapper: FC<VideoWrapperProps> = (props): JSX.Element => {
  return <iframe className='w-full aspect-video' src={props.url}></iframe>;
};
