'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type SlugMap = Record<string, string>

interface SlugContextType {
  slugMap: SlugMap
  setSlugMap: (map: SlugMap) => void
}

const SlugContext = createContext<SlugContextType | undefined>(undefined)

export function SlugProvider({ children }: { children: ReactNode }) {
  const [slugMap, setSlugMap] = useState<SlugMap>({})

  return (
    <SlugContext.Provider value={{ slugMap, setSlugMap }}>
      {children}
    </SlugContext.Provider>
  )
}

export function useSlug() {
  const context = useContext(SlugContext)
  if (context === undefined) {
    throw new Error('useSlug must be used within a SlugProvider')
  }
  return context
}

/**
 * A small client component to set the slug map from a server component
 */
export function SetSlug({ slugs }: { slugs: SlugMap }) {
  const { setSlugMap } = useSlug()

  useEffect(() => {
    setSlugMap(slugs)
    // Reset on unmount if needed, but usually we just want to overwrite
  }, [slugs, setSlugMap])

  return null
}
