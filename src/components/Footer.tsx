import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function SiteFooter() {
  return (
    <footer className="site-footer mt-12 py-4">
      <Separator className="mb-4" />
      <div className="site-footer-inner max-w-4xl mx-auto px-8 flex justify-end">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin">Dashboard</Link>
        </Button>
      </div>
    </footer>
  )
}
