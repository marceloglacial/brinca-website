import { cn } from '@/lib/utils'

type Props = {
  block: {
    blockType: 'imageBlock'
    imageUrl: string
    width?: 'full' | 'half' | 'original' | null
  }
}

const widthClasses: Record<'full' | 'half' | 'original', string> = {
  full: 'w-full',
  half: 'w-full md:w-1/2',
  original: 'w-auto max-w-full',
}

export default function ImageBlockComponent({ block }: Props) {
  const width = block.width ?? 'full'

  return (
    <section className="flex w-full justify-center">
      <figure className={cn('overflow-hidden', widthClasses[width])}>
        <img
          src={block.imageUrl}
          alt=""
          className={cn(
            'h-auto max-w-full rounded-2xl',
            width === 'full' && 'w-full',
            width === 'half' && 'w-full',
          )}
        />
      </figure>
    </section>
  )
}
