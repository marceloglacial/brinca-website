import Link from 'next/link'
import type { SVGProps } from 'react'
import { getPayload } from 'payload'
import type { LocaleCode } from '@/constants/locales'
import config from '@/payload.config'

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3V11H9v3h2.3v7h2.2Z" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  )
}

export default async function SiteFooter({ locale }: { locale: LocaleCode }) {
  const loginLabel = locale === 'pt-BR' ? 'Admin' : 'Login'
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: pages } = await payload.find({
    collection: 'pages',
    locale: locale as any,
    where: {
      showInNavbar: {
        equals: true,
      },
    },
    limit: 100,
    sort: 'title',
  })

  return (
    <footer className="border-t border-gray-200 pt-8">
      <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start lg:gap-8">
          {pages.map((page) => {
            const slug = page.slug
            if (!slug) return null

            return (
              <Link
                key={page.id}
                href={`/${locale}/${slug}`}
                className="font-normal transition-colors duration-200 hover:text-[#16a34a]"
              >
                {page.title ?? 'Page'}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3 lg:ml-8">
          <a
            href="https://www.facebook.com/ottawa.brinca"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition-colors duration-200 hover:text-[#16a34a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
          >
            <span className="sr-only">Facebook</span>
            <FacebookIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/brinca_official/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition-colors duration-200 hover:text-[#16a34a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a] focus-visible:ring-offset-2"
          >
            <span className="sr-only">Instagram</span>
            <InstagramIcon className="h-5 w-5" />
          </a>
          <Link
            href="/admin/login"
            className="font-normal transition-colors duration-200 hover:text-[#16a34a]"
          >
            {loginLabel}
          </Link>
        </div>
      </div>
    </footer>
  )
}
