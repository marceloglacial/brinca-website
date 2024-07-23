import { getCloudinaryImages } from '@/services';
import Image from 'next/image';
import { FC } from 'react';

interface ICloudinaryGallery {
  path: string;
}

export const CloudinaryGallery: FC<ICloudinaryGallery> = async (props) => {
  const data = await getCloudinaryImages(props.path);

  return (
    <div className='gallery grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
      {data.map((image, index) => (
        <figure key={index} className='relative w-full aspect-square shadow-xl'>
          <Image
            alt='image'
            src={image}
            className=' object-cover rounded-lg'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            fill
          />
        </figure>
      ))}
    </div>
  );
};
