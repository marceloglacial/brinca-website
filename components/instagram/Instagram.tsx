'use client'
import { FC, JSX, useEffect } from 'react'

export const Instagram: FC<InstagramProps> = (props): JSX.Element => {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    } else {
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [props.url])
  const showCaptions = props.showText ? { 'data-instgrm-captioned': true } : {}

  return (
    <div className='instagram-embed'>
      <blockquote
        className='instagram-media'
        data-instgrm-permalink={props.url}
        {...showCaptions}
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px auto',
          width: '100%',
          padding: 0,
        }}
      ></blockquote>
    </div>
  )
}

// Add type declaration for window.instgrm
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void
      }
    }
  }
}
