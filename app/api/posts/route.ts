import { NextResponse } from 'next/server'
import type { ApiPost } from '@/lib/platform/api'
import { getPagination, paginate } from '@/lib/platform/onchain-api'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const { page, limit } = getPagination(url.searchParams)
  return NextResponse.json(paginate<ApiPost>([], page, limit))
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body?.campaignId || !body?.company || !body?.content) {
    return NextResponse.json({ error: 'Invalid post payload' }, { status: 400 })
  }

  const post: ApiPost = {
    id: Date.now(),
    campaignId: Number(body.campaignId),
    company: String(body.company),
    content: String(body.content),
    createdAt: new Date().toISOString(),
  }

  return NextResponse.json(post, { status: 201 })
}
