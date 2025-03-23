'use client'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

import Image from 'next/image'
import { useEffect } from 'react'
import { Animation } from '../animation/Animation'

export const PhotoGallery = (props: { images: any[] }) => {
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: '#photo-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    })
    lightbox.init()

    return () => {
      lightbox?.destroy()
      lightbox = null
    }
  }, [])

  return (
    <div className='grid grid-cols-5 gap-8 pt-8' id='photo-gallery'>
      {props.images.map((image, index) => {
        return (
          <Animation key={index}>
            <div className='relative aspect-square h-full w-full overflow-hidden rounded-lg shadow-lg'>
              <a
                href={image.src}
                data-pswp-width={image.width * 2}
                data-pswp-height={image.height * 2}
                key={'photo-gallery-' + index}
                target='_blank'
                rel='noreferrer'
                className='relative flex h-full w-full'
              >
                <Image
                  className='object-cover'
                  src={image.src}
                  alt={image.src}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </a>
            </div>
          </Animation>
        )
      })}
    </div>
  )
}
