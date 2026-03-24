import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const locale = url.searchParams.get('locale') || undefined

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: pages } = await payload.find({
    collection: 'pages',
    locale: locale as any,
    limit: 100,
    sort: 'title',
  })

  return NextResponse.json({ pages })
}
