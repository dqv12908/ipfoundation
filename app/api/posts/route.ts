import { NextResponse } from 'next/server'
import { getPrisma, isDatabaseConfigured } from '@/lib/platform/db'
import { getPagination } from '@/lib/platform/onchain-api'
import {
  normalizeWallet,
  requireCompanyToken,
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
  const tab = url.searchParams.get('tab') ?? 'global'
  const investor = url.searchParams.get('investor')
    ? normalizeWallet(url.searchParams.get('investor')!)
    : ''
  const { page, limit } = getPagination(url.searchParams)

  try {
    const prisma = getPrisma()
    const skip = (page - 1) * limit
    let where: { campaignId?: { in: number[] }; company?: { in: string[] } } = {}

    if (tab === 'invested' && investor) {
      const commitments = await prisma.commitment.findMany({
        where: { investor },
        select: { campaignId: true },
        distinct: ['campaignId'],
      })
      const campaignIds = commitments.map((commitment) => commitment.campaignId)
      if (campaignIds.length === 0) {
        return NextResponse.json({
          items: [],
          pagination: { page, limit, total: 0, pages: 0 },
        })
      }
      where = { campaignId: { in: campaignIds } }
    } else if (tab === 'following' && investor) {
      const follows = await prisma.follow.findMany({
        where: { follower: investor },
        select: { company: true },
      })
      const companies = follows.map((follow) => follow.company)
      if (companies.length === 0) {
        return NextResponse.json({
          items: [],
          pagination: { page, limit, total: 0, pages: 0 },
        })
      }
      where = { company: { in: companies } }
    }

    const [items, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          campaign: {
            select: {
              id: true,
              onChainId: true,
              name: true,
              symbol: true,
              company: true,
              imageUrl: true,
              status: true,
            },
          },
        },
      }),
      prisma.post.count({ where }),
    ])

    const wallets = [...new Set(items.map((post) => post.company))]
    const accounts = await prisma.companyAccount.findMany({
      where: { walletAddress: { in: wallets } },
      select: { walletAddress: true, name: true },
    })
    const nameMap = new Map(
      accounts.map((account) => [account.walletAddress, account.name]),
    )

    const enriched = items.map((post) => ({
      ...post,
      companyName: nameMap.get(post.company) ?? null,
    }))

    return NextResponse.json({
      items: enriched,
      pagination: {
        page,
        limit,
        total,
        pages: total === 0 ? 0 : Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Failed to load posts', error)
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: 'Database is not configured' },
      { status: 503 },
    )
  }

  const body = await request.json().catch(() => null)
  const payload = requireCompanyToken(request)

  if (!payload) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 },
    )
  }

  const campaignId = Number(body?.campaignId)
  const content = String(body?.content ?? '').trim()

  if (!Number.isInteger(campaignId) || !content) {
    return NextResponse.json(
      { error: 'Campaign and content are required' },
      { status: 400 },
    )
  }

  const prisma = getPrisma()
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  })

  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
  }

  if (campaign.company.toLowerCase() !== payload.walletAddress.toLowerCase()) {
    return NextResponse.json(
      { error: 'Only the campaign owner can post updates' },
      { status: 403 },
    )
  }

  const post = await prisma.post.create({
    data: {
      campaignId: campaign.id,
      company: payload.walletAddress.toLowerCase(),
      content,
    },
    include: {
      campaign: {
        select: {
          id: true,
          onChainId: true,
          name: true,
          symbol: true,
          company: true,
          imageUrl: true,
          status: true,
        },
      },
    },
  })

  const account = await prisma.companyAccount.findUnique({
    where: { walletAddress: payload.walletAddress.toLowerCase() },
    select: { name: true },
  })

  return NextResponse.json(
    {
      ...post,
      companyName: account?.name ?? null,
    },
    { status: 201 },
  )
}
