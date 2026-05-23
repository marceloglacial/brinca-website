import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  ctaHref?: string | null
  ctaLabel?: string | null
  description?: string | null
  image?: string | null
  imageAlt: string
  reversed?: boolean
  shadowedImage?: boolean
  title: string
}

export default function HeroSection({
  ctaHref,
  ctaLabel,
  description,
  image,
  imageAlt,
  reversed = false,
  shadowedImage = true,
  title,
}: Props) {
  return (
    <section className="w-full">
      <div
        className={cn(
          'flex w-full flex-col-reverse gap-6 text-center md:flex-row md:gap-12 md:text-left',
          reversed && 'md:flex-row-reverse',
        )}
      >
        {image ? (
          <figure
            className={cn(
              'aspect-[4/3] h-56 overflow-hidden rounded-2xl md:h-72 md:w-1/2 lg:h-96',
              shadowedImage && 'shadow-2xl',
            )}
          >
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
          </figure>
        ) : null}

        <div className="my-auto space-y-4 md:w-1/2">
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
          {ctaHref && ctaLabel ? (
            <Button asChild variant="brincaOutline" size="brinca">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}
