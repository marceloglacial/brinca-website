import React from 'react'
import { getCloudinaryFolderImages } from '@/lib/cloudinary'

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
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image.id} className="gallery-item">
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>
      <style>{`
        .cloudinary-gallery {
          margin-top: 3rem;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .gallery-item img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 8px;
          display: block;
        }
      `}</style>
    </section>
  )
}
