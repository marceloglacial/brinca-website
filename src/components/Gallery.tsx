'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
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
      <div className="grid grid-cols-4 gap-4 mt-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative cursor-pointer overflow-hidden rounded-lg aspect-square bg-gray-900 transition-transform hover:scale-105 ${
              loadedThumbnails[image.id] ? '' : ''
            }`}
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
              className={`w-full h-full object-cover transition-opacity ${
                loadedThumbnails[image.id] ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!loadedThumbnails[image.id] && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse" />
            )}
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-[90%] max-h-[90%] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {isFullImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-[51]">
                <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <img
              src={getFullUrl(images[selectedIndex].src)}
              alt={images[selectedIndex].alt}
              onLoad={() => setIsFullImageLoading(false)}
              className="max-w-full max-h-[90vh] object-contain rounded transition-opacity"
              style={{ opacity: isFullImageLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}
            />
            <Button 
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="fixed top-5 right-7 text-white text-4xl h-auto w-auto p-0 hover:bg-transparent"
              aria-label="Close"
            >
              ×
            </Button>
            <Button 
              variant="ghost"
              size="icon"
              onClick={showPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-4xl h-auto w-auto p-5 bg-white/10 hover:bg-white/20 lg:left-3 lg:right-auto"
              aria-label="Previous"
            >
              ‹
            </Button>
            <Button 
              variant="ghost"
              size="icon"
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-4xl h-auto w-auto p-5 bg-white/10 hover:bg-white/20 lg:right-3 lg:left-auto"
              aria-label="Next"
            >
              ›
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
