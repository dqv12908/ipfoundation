import { NextResponse } from 'next/server'
import { getPrisma, isDatabaseConfigured } from '@/lib/platform/db'
import {
  fetchCampaigns,
  getPagination,
} from '@/lib/platform/onchain-api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const { page, limit } = getPagination(url.searchParams)
  const status = url.searchParams.get('status')

  if (!isDatabaseConfigured()) {
    try {
      const result = await fetchCampaigns({ status, page, limit })
      return NextResponse.json(result)
    } catch (error) {
      console.error('Failed to load campaigns from chain', error)
      return NextResponse.json(
        { error: 'Database is not configured and on-chain fallback failed' },
        { status: 502 },
      )
    }
  }

  try {
    const prisma = getPrisma()
    const where = status ? { status } : {}
    const skip = (page - 1) * limit
    const [items, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { _count: { select: { commitments: true } } },
      }),
      prisma.campaign.count({ where }),
    ])

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: total === 0 ? 0 : Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Failed to load campaigns', error)
    return NextResponse.json(
      { error: 'Failed to load campaigns' },
      { status: 500 },
    )
  }
}
