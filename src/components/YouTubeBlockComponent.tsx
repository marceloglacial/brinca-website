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
    <div className="page-video py-8 md:py-12">
      <div className="aspect-video overflow-hidden rounded-lg">
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </div>
  )
}
