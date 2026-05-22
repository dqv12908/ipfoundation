import { NextResponse } from 'next/server'
import { getPrisma, isDatabaseConfigured } from '@/lib/platform/db'
import { normalizeWallet } from '@/lib/platform/server-store'
import {
  fetchInvestorParticipations,
  getPagination,
  paginate,
} from '@/lib/platform/onchain-api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const investor = url.searchParams.get('investor')
  const { page, limit } = getPagination(url.searchParams)

  if (!investor) {
    return NextResponse.json(paginate([], page, limit))
  }

  if (!isDatabaseConfigured()) {
    try {
      const participations = await fetchInvestorParticipations(investor)
      return NextResponse.json(paginate(participations, page, limit))
    } catch (error) {
      console.error('Failed to load on-chain participations', error)
      return NextResponse.json(
        { error: 'Database is not configured and on-chain fallback failed' },
        { status: 502 },
      )
    }
  }

  try {
    const prisma = getPrisma()
    const normalizedInvestor = normalizeWallet(investor)
    const skip = (page - 1) * limit
    const where = { investor: normalizedInvestor }
    const [items, total] = await Promise.all([
      prisma.commitment.findMany({
        where,
        include: {
          campaign: {
            select: {
              id: true,
              onChainId: true,
              contractAddress: true,
              name: true,
              symbol: true,
              company: true,
              imageUrl: true,
              status: true,
              tokenPrice: true,
              totalCommitted: true,
              maxRaise: true,
              finalized: true,
              successful: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.commitment.count({ where }),
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
    console.error('Failed to load participations', error)
    return NextResponse.json(
      { error: 'Failed to load participations' },
      { status: 500 },
    )
  }
}
