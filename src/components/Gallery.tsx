'use client'

import React, { useState, useEffect, useCallback } from 'react'
import type { CloudinaryGalleryImage } from '@/lib/cloudinary'

type GalleryProps = {
  images: CloudinaryGalleryImage[]
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
    document.body.style.overflow = ''
  }, [])

  const showNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex + 1) % images.length)
  }, [selectedIndex, images.length])

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
  }, [selectedIndex, images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, closeLightbox, showNext, showPrev])

  const getThumbnailUrl = (url: string) => {
    // Basic Cloudinary transformation insertion
    return url.replace('/upload/', '/upload/c_fill,w_400,h_400,g_auto,f_auto,q_auto/')
  }

  const getFullUrl = (url: string) => {
    return url.replace('/upload/', '/upload/f_auto,q_auto/')
  }

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
          >
            <img src={getThumbnailUrl(image.src)} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={getFullUrl(images[selectedIndex].src)}
              alt={images[selectedIndex].alt}
            />
            <button className="close-button" onClick={closeLightbox} aria-label="Close">
              ×
            </button>
            <button className="nav-button prev" onClick={showPrev} aria-label="Previous">
              ‹
            </button>
            <button className="nav-button next" onClick={showNext} aria-label="Next">
              ›
            </button>
          </div>
        </div>
      )}

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
        }
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
        .gallery-item {
          cursor: pointer;
          overflow: hidden;
          border-radius: 8px;
          aspect-ratio: 1 / 1;
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .gallery-item:hover img {
          transform: scale(1.05);
        }
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
        }
        .lightbox-content img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 4px;
        }
        .close-button {
          position: fixed;
          top: 20px;
          right: 30px;
          background: none;
          border: none;
          color: white;
          font-size: 40px;
          cursor: pointer;
          z-index: 1001;
        }
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          font-size: 40px;
          padding: 20px;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.3s;
        }
        .nav-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .prev {
          left: -80px;
        }
        .next {
          right: -80px;
        }
        @media (max-width: 1200px) {
          .prev { left: 10px; }
          .next { right: 10px; }
          .nav-button {
            background: rgba(0, 0, 0, 0.3);
          }
        }
      `}</style>
    </div>
  )
}
