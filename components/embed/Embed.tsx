import { FC } from 'react';
import { getVimeoId, getYouTubeId } from '@/utils';
import { VideoWrapper } from '@/components';

interface EmbedProps {
  url: string;
  type: string;
}

export const Embed: FC<EmbedProps> = (props): JSX.Element => {
  switch (props.type) {
    case 'youtube':
      return (
        <VideoWrapper
          url={`https://www.youtube.com/embed/${getYouTubeId(props.url)}`}
        />
      );
    case 'soundcloud':
      return (
        <VideoWrapper
          url={`https://w.soundcloud.com/player/?url=${getYouTubeId(
            props.url
          )}`}
        />
      );
    case 'vimeo':
      return (
        <VideoWrapper
          url={`https://player.vimeo.com/video/${getVimeoId(props.url)}`}
        />
      );
    default:
      return <></>;
  }
};
