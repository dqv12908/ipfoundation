import { NextResponse } from 'next/server'
import { getPrisma, isDatabaseConfigured } from '@/lib/platform/db'
import {
  normalizeWallet,
} from '@/lib/platform/server-store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: 'Database is not configured' },
      { status: 503 },
    )
  }

  const url = new URL(request.url)
  const follower = url.searchParams.get('follower')

  if (!follower) {
    return NextResponse.json(
      { error: 'follower query param required' },
      { status: 400 },
    )
  }

  const normalizedFollower = normalizeWallet(follower)
  const prisma = getPrisma()
  const items = await prisma.follow.findMany({
    where: { follower: normalizedFollower },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: 'Database is not configured' },
      { status: 503 },
    )
  }

  const body = await request.json().catch(() => null)
  const follower = normalizeWallet(String(body?.follower ?? ''))
  const company = normalizeWallet(String(body?.company ?? ''))

  if (!follower || !company) {
    return NextResponse.json(
      { error: 'follower and company are required' },
      { status: 400 },
    )
  }

  const prisma = getPrisma()
  const follow = await prisma.follow.upsert({
    where: { follower_company: { follower, company } },
    create: {
      follower,
      company,
    },
    update: {},
  })

  return NextResponse.json(follow, { status: 201 })
}

export async function DELETE(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: 'Database is not configured' },
      { status: 503 },
    )
  }

  const body = await request.json().catch(() => null)
  const follower = normalizeWallet(String(body?.follower ?? ''))
  const company = normalizeWallet(String(body?.company ?? ''))

  if (!follower || !company) {
    return NextResponse.json(
      { error: 'follower and company are required' },
      { status: 400 },
    )
  }

  const prisma = getPrisma()
  await prisma.follow.deleteMany({
    where: { follower, company },
  })

  return NextResponse.json({ success: true })
}
