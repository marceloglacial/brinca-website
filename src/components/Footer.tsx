import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-links">
          <a className="admin" href="/admin">Dashboard</a>
        </div>
      </div>

      <style>{`
        .site-footer {
          border-top: 1px solid #eaeaea;
          margin-top: 3rem;
          padding: 1rem 0;
        }
        .site-footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: flex-end;
        }
        .site-footer .admin {
          color: #666;
          text-decoration: none;
        }
      `}</style>
    </footer>
  )
}
