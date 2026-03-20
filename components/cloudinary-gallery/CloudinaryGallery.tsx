import { FC } from 'react'
import { PhotoGallery } from '../photo-gallery/PhotoGallery'
import { getCloudinaryImages } from '@/lib/cloudinary'

interface ICloudinaryGallery {
  path: string
}

export const CloudinaryGallery: FC<ICloudinaryGallery> = async (props) => {
  const data = await getCloudinaryImages(props.path)

  const images = data.map((image) => {
    return {
      ...image,
      alt: 'Photo',
    }
  })

  return <PhotoGallery images={images} />
}
