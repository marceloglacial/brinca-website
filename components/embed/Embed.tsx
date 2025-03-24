'use client'
import { getVimeoId, getYouTubeId } from '@/utils'
import { FC } from 'react'

interface IframeProps {
  url: string
  type: string
  caption?: string
}

type EmbedType = {
  [key: string]: {
    url: string
    type: string
    height?: string
  }
}

export const Embed: FC<IframeProps> = (props) => {
  const { url, type, caption } = props
  const embeds: EmbedType = {
    soundcloud: {
      url: `https://w.soundcloud.com/player/?url=${url}`,
      type: 'audio',
    },
    youtube: {
      url: `https://www.youtube.com/embed/${getYouTubeId(url)}`,
      type: 'video',
    },
    vimeo: {
      url: `https://player.vimeo.com/video/${getVimeoId(url)}`,
      type: 'video',
    },
  }

  if (!embeds[type]) return <></>

  return (
    <figure>
      <iframe
        className='aspect-video w-full rounded-2xl shadow-xl'
        allow='autoplay'
        src={embeds[type].url}
      ></iframe>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
