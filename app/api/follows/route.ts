import { NextResponse } from 'next/server'
import type { ApiFollow } from '@/lib/platform/api'
import { getPagination, paginate } from '@/lib/platform/onchain-api'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const { page, limit } = getPagination(url.searchParams)
  return NextResponse.json(paginate<ApiFollow>([], page, limit))
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body?.follower || !body?.company) {
    return NextResponse.json({ error: 'Invalid follow payload' }, { status: 400 })
  }

  return NextResponse.json({
    id: Date.now(),
    follower: String(body.follower),
    company: String(body.company),
    createdAt: new Date().toISOString(),
  })
}

export async function DELETE() {
  return NextResponse.json({ ok: true })
}
