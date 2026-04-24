import Link from 'next/link'
import { getPayload } from 'payload'
import type { LocaleCode } from '@/constants/locales'
import config from '@/payload.config'

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

        <div className="flex items-center lg:ml-8">
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
