import { Hero as HeroUi } from '@marceloglacial/brinca-ui';
import Image from 'next/image';
import { FC } from 'react';
import { Link as LinkUI } from '@/components';
import Link from 'next/link';

export const Hero: FC<HeroProps> = (props): JSX.Element => {
  const isReverse = props.id % 2 === 0;
  return (
    <HeroUi reversed={isReverse}>
      <HeroUi.Image rounded={props.rounded} shadow={props.shadow}>
        <figure className='relative w-full h-full'>
          <Image
            alt='Hero Image'
            className='w-full h-full object-cover'
            src={props.image.src}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
            fill
          />
        </figure>
      </HeroUi.Image>
      <HeroUi.Body>
        <h1>{props.title[props.language]}</h1>
        <p>{props.description[props.language]}</p>
        <Link className='inline-block' href={props.link.link[props.language]}>
          <LinkUI variant='secondary'>{props.link.text[props.language]}</LinkUI>
        </Link>
      </HeroUi.Body>
    </HeroUi>
  );
};
