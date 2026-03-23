'use client'

import React, { useState, useEffect, useCallback } from 'react'
import type { CloudinaryGalleryImage } from '@/lib/cloudinary'

type GalleryProps = {
  images: CloudinaryGalleryImage[]
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isFullImageLoading, setIsFullImageLoading] = useState(false)
  const [loadedThumbnails, setLoadedThumbnails] = useState<Record<string, boolean>>({})

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setIsFullImageLoading(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
    setIsFullImageLoading(false)
    document.body.style.overflow = ''
  }, [])

  const showNext = useCallback(() => {
    if (selectedIndex === null) return
    setIsFullImageLoading(true)
    setSelectedIndex((selectedIndex + 1) % images.length)
  }, [selectedIndex, images.length])

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return
    setIsFullImageLoading(true)
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
    return url.replace('/upload/', '/upload/c_fill,w_400,h_400,g_auto,f_auto,q_auto/')
  }

  const getFullUrl = (url: string) => {
    return url.replace('/upload/', '/upload/f_auto,q_auto/')
  }

  const handleThumbnailLoad = (id: string) => {
    setLoadedThumbnails(prev => ({ ...prev, [id]: true }))
  }

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`gallery-item ${loadedThumbnails[image.id] ? 'loaded' : 'loading'}`}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
          >
            <img 
              src={getThumbnailUrl(image.src)} 
              alt={image.alt} 
              loading="lazy" 
              onLoad={() => handleThumbnailLoad(image.id)}
            />
            {!loadedThumbnails[image.id] && <div className="thumbnail-skeleton" />}
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {isFullImageLoading && (
              <div className="lightbox-loader">
                <div className="spinner"></div>
              </div>
            )}
            <img
              src={getFullUrl(images[selectedIndex].src)}
              alt={images[selectedIndex].alt}
              onLoad={() => setIsFullImageLoading(false)}
              style={{ opacity: isFullImageLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}
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
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }
        .gallery-item {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 8px;
          aspect-ratio: 1 / 1;
          background: #222;
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .gallery-item.loaded img {
          opacity: 1;
        }
        .gallery-item:hover img {
          transform: scale(1.05);
        }
        .thumbnail-skeleton {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #222 25%, #333 50%, #222 75%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
        }
        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
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
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox-content img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 4px;
        }
        .lightbox-loader {
          position: absolute;
          z-index: 1002;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
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
        .prev { left: -80px; }
        .next { right: -80px; }
        @media (max-width: 1200px) {
          .prev { left: 10px; }
          .next { right: 10px; }
          .nav-button { background: rgba(0, 0, 0, 0.3); }
        }
      `}</style>
    </div>
  )
}
