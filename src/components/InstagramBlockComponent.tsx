import InstagramEmbed from './InstagramEmbed'

type Props = {
  block: {
    blockType: 'instagramBlock'
    url: string
  }
}

export default function InstagramBlockComponent({ block }: Props) {
  return <InstagramEmbed url={block.url} />
}
