import { FC, lazy } from 'react';
import { PhotoGallery } from '@/components';
import { getCloudinaryImages } from '@/services';

interface ICloudinaryGallery {
  path: string;
}

export const CloudinaryGallery: FC<ICloudinaryGallery> = async (props) => {
  const data = await getCloudinaryImages(props.path);
  const images = data.map((image) => {
    return {
      src: image,
      alt: 'Photo',
    };
  });

  return <PhotoGallery images={images} />;
};
