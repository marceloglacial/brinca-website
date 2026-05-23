'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, LoaderCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
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
  }

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
    setIsFullImageLoading(false)
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
    setLoadedThumbnails((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <div className="gallery-container">
      <div className="mt-6 grid grid-cols-3 gap-4 lg:grid-cols-6">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-xl border bg-muted/40 transition-transform hover:scale-[1.02]"
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
              className={`h-full w-full object-cover transition-opacity ${
                loadedThumbnails[image.id] ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!loadedThumbnails[image.id] && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted via-muted/80 to-muted" />
            )}
          </div>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        {selectedIndex !== null ? (
          <DialogContent
            showCloseButton={false}
            className="max-w-[95vw] border-0 bg-black/95 p-4 text-white shadow-none sm:rounded-xl"
          >
            <DialogTitle className="sr-only">{images[selectedIndex].alt}</DialogTitle>
            <DialogDescription className="sr-only">Image gallery preview</DialogDescription>
            <div className="relative flex max-h-[90vh] items-center justify-center">
              {isFullImageLoading ? (
                <div className="absolute inset-0 z-[51] flex items-center justify-center">
                  <LoaderCircle className="h-10 w-10 animate-spin text-white/80" />
                </div>
              ) : null}

              <img
                src={getFullUrl(images[selectedIndex].src)}
                alt={images[selectedIndex].alt}
                onLoad={() => setIsFullImageLoading(false)}
                className={`max-h-[90vh] max-w-full rounded object-contain transition-opacity ${
                  isFullImageLoading ? 'opacity-0' : 'opacity-100'
                }`}
              />

              <Button
                variant="ghost"
                size="icon"
                onClick={closeLightbox}
                className="absolute right-2 top-2 h-10 w-10 text-white hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={showPrev}
                className="absolute left-2 top-1/2 h-12 w-12 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 lg:left-3"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={showNext}
                className="absolute right-2 top-1/2 h-12 w-12 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 lg:right-3"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  )
}
