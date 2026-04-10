import { extractYouTubeId, getYouTubeEmbedUrl } from '@/lib/youtube'

type Props = {
  block: {
    blockType: 'youTubeBlock'
    url: string
  }
}

export default function YouTubeBlockComponent({ block }: Props) {
  const videoId = extractYouTubeId(block.url)
  const embedUrl = getYouTubeEmbedUrl(videoId)

  if (!embedUrl) return null

  return (
    <div className="page-video">
      <iframe
        width="100%"
        height="480"
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
