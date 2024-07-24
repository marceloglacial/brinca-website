'use client';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'react-spring-lightbox';
import { ImagesListItem } from 'react-spring-lightbox/dist/types/ImagesList';

export const PhotoGallery = ({
  images,
}: {
  images: ImagesListItem[];
}): JSX.Element => {
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  const handleClick = (id: number) => {
    setIsOpen(true);
    setCurrentIndex(id);
  };

  const CloseButton = () => (
    <div
      className='absolute top-0 right-0 p-8 text-white font-bold cursor-pointer z-50'
      onClick={() => setIsOpen(false)}
    >
      X
    </div>
  );

  return (
    <>
      <Lightbox
        isOpen={isOpen}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        onClose={() => setIsOpen(false)}
        images={images}
        currentIndex={currentImageIndex}
        className='relative'
        style={{ background: 'rgba(0,0,0,90%' }}
        renderHeader={() => <CloseButton />}
      />
      <div className='gallery grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {images.map((image: ImagesListItem, index: number) => (
          <figure
            key={index}
            className='relative w-full aspect-square shadow-xl cursor-pointer'
            onClick={() => handleClick(index)}
          >
            <Image
              alt='image'
              src={image.src}
              className=' object-cover rounded-lg'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              fill
              priority
            />
          </figure>
        ))}
      </div>
    </>
  );
};
