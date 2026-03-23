import React from 'react'
import { getCloudinaryFolderImages } from '@/lib/cloudinary'
import Gallery from './Gallery'

export default async function CloudinaryGallery({
  folderPath,
  title,
}: {
  folderPath?: string | null
  title?: string
}) {
  if (!folderPath) return null

  const images = await getCloudinaryFolderImages(folderPath)

  if (images.length === 0) return null

  return (
    <section className="cloudinary-gallery">
      {title && <h2>{title}</h2>}
      <Gallery images={images} />
      <style>{`
        .cloudinary-gallery {
          margin-top: 3rem;
        }
      `}</style>
    </section>
  )
}
