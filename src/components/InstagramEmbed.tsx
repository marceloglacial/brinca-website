'use client'

import React, { useEffect, useRef } from 'react'

type Props = {
  url: string
  maxWidth?: number
}

export default function InstagramEmbed({ url, maxWidth = 540 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!url || !ref.current) return

    // Create the blockquote required by Instagram
    ref.current.innerHTML = `
      <blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="background:#FFF; border:0; margin: 0 auto; max-width: ${maxWidth}px; width:100%; padding:0;">
        <a href="${url}" target="_blank" rel="noopener noreferrer">Instagram post</a>
      </blockquote>
    `

    // Helper to process embeds if script is loaded
    const runProcess = () => {
      try {
        const w = window as any
        if (w.instgrm && w.instgrm.Embeds && typeof w.instgrm.Embeds.process === 'function') {
          w.instgrm.Embeds.process()
        }
      } catch (e) {
        // ignore
      }
    }

    // If script already present, just run
    const existing = document.querySelector('script[src="https://www.instagram.com/embed.js"], script[src="//www.instagram.com/embed.js"]')
    if (existing) {
      // small delay to allow script to initialize
      setTimeout(runProcess, 50)
      return
    }

    // Otherwise append the script
    const s = document.createElement('script')
    s.async = true
    s.defer = true
    s.src = 'https://www.instagram.com/embed.js'
    s.onload = runProcess
    document.body.appendChild(s)

    return () => {
      // do not remove the script (may be used elsewhere)
    }
  }, [url, maxWidth])

  return (
    <div className="instagram-embed" ref={ref}>
      {/* Server-rendered fallback link for non-JS or before embed loads */}
      <a href={url} target="_blank" rel="noopener noreferrer">
        View Instagram post
      </a>
      <style jsx>{`
        .instagram-embed {
          width: 100%;
          display: block;
          margin: 1rem 0;
        }
        .instagram-embed iframe {
          max-width: 100% !important;
        }
      `}</style>
    </div>
  )
}
