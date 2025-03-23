import { Hero as HeroUi, Link } from '@/components/ui'
import Image from 'next/image'
import NextLink from 'next/link'

export const Hero: React.FC<HeroProps> = (props) => {
  return (
    <HeroUi reversed={props.reversed}>
      <HeroUi.Image rounded={props?.rounded} shadow={props?.shadow}>
        <figure className='relative h-full w-full'>
          <Image
            alt='Hero Image'
            className='h-full w-full object-cover'
            src={props.image}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
            fill
          />
        </figure>
      </HeroUi.Image>
      <HeroUi.Body>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <NextLink className='inline-block' href={props.link.url}>
          <Link variant='secondary'>{props.link.title}</Link>
        </NextLink>
      </HeroUi.Body>
    </HeroUi>
  )
}
