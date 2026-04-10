import Link from 'next/link'

type Props = {
  block: {
    blockType: 'heroBlock'
    title: string
    description?: string | null
    image?: string | null
    direction?: 'left' | 'right' | null
    cta?: {
      label?: string | null
      url?: string | null
      openInNewWindow?: boolean | null
    } | null
  }
}

export default function HeroBlockComponent({ block }: Props) {
  const imageOnLeft = block.direction === 'left'

  return (
    <section className="hero-block">
      <div className={`hero-inner ${imageOnLeft ? 'hero-reverse' : ''}`}>
        <div className="hero-content">
          <h1 className="hero-title">{block.title}</h1>
          {block.description && <p className="hero-description">{block.description}</p>}
          {block.cta?.url && (
            <Link
              href={block.cta.url}
              className="hero-cta"
              {...(block.cta.openInNewWindow
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {block.cta.label || block.cta.url}
            </Link>
          )}
        </div>

        {block.image && (
          <div className="hero-image-wrap">
            <img src={block.image} alt={block.title} className="hero-image" />
          </div>
        )}
      </div>

      <style>{`
        .hero-block {
          padding: 4rem 0;
        }
        .hero-inner {
          display: flex;
          align-items: center;
          gap: 3rem;
        }
        .hero-reverse {
          flex-direction: row-reverse;
        }
        .hero-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .hero-title {
          margin: 0;
          font-size: 3rem;
          line-height: 1.1;
        }
        .hero-description {
          margin: 0;
          font-size: 1.2rem;
          line-height: 1.6;
          opacity: 0.8;
        }
        .hero-cta {
          display: inline-block;
          align-self: flex-start;
          padding: 0.75rem 1.75rem;
          background: #019f44;
          color: #fff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: background 0.2s;
        }
        .hero-cta:hover {
          background: #02662c;
        }
        .hero-image-wrap {
          flex: 1;
        }
        .hero-image {
          width: 100%;
          height: auto;
          border-radius: 12px;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .hero-inner,
          .hero-reverse {
            flex-direction: column;
          }
          .hero-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  )
}
