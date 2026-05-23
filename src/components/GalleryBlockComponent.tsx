import CloudinaryGallery from './CloudinaryGallery'
import { getLocalizedValue } from '@/lib/locales'

type Props = {
  block: {
    blockType: 'galleryBlock'
    cloudinaryFolder: string
    title?: string | null | Record<string, string>
  }
  locale: string
}

export default function GalleryBlockComponent({ block, locale }: Props) {
  const title = getLocalizedValue(block.title, locale) || undefined

  return <CloudinaryGallery folderPath={block.cloudinaryFolder} title={title} />
}
