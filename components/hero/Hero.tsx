import { Hero as HeroUi } from '@marceloglacial/brinca-ui';
import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

interface HeroProps {
  locale: string;
  title: LocalizedString;
  description: LocalizedString;
  image: ImageProps;
}

export const Hero: FC<HeroProps> = (props): JSX.Element => {
  return (
    <HeroUi>
      <HeroUi.Image rounded shadow>
        <figure className='relative w-full h-full'>
          <Image
            alt='Hero Image'
            className='w-full h-full object-cover'
            src={props.image.src}
            fill
          />
        </figure>
      </HeroUi.Image>
      <HeroUi.Body>
        <h1>{props.title[props.locale]}</h1>
        <p>{props.description[props.locale]}</p>
      </HeroUi.Body>
    </HeroUi>
  );
};
