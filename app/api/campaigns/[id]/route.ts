import { NextResponse } from 'next/server'
import { getPrisma, isDatabaseConfigured } from '@/lib/platform/db'
import { fetchCampaign } from '@/lib/platform/onchain-api'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const onChainId = Number(params.id)

  if (!Number.isInteger(onChainId) || onChainId < 0) {
    return NextResponse.json({ error: 'Invalid campaign id' }, { status: 400 })
  }

  if (!isDatabaseConfigured()) {
    try {
      const campaign = await fetchCampaign(onChainId)
      return NextResponse.json(campaign)
    } catch (error) {
      console.error(`Failed to load campaign ${params.id} from chain`, error)
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }
  }

  try {
    const prisma = getPrisma()
    const campaign = await prisma.campaign.findUnique({
      where: { onChainId },
      include: {
        commitments: { orderBy: { createdAt: 'desc' } },
        _count: { select: { commitments: true } },
      },
    })

    if (!campaign) {
      try {
        const fallback = await fetchCampaign(onChainId)
        return NextResponse.json(fallback)
      } catch {
        return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
      }
    }

    return NextResponse.json(campaign)
  } catch (error) {
    console.error(`Failed to load campaign ${params.id}`, error)
    return NextResponse.json({ error: 'Failed to load campaign' }, { status: 500 })
  }
}
