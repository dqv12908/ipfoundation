import { NextResponse } from 'next/server'
import { fetchCampaign } from '@/lib/platform/onchain-api'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const onChainId = Number(params.id)

  if (!Number.isInteger(onChainId) || onChainId < 0) {
    return NextResponse.json({ error: 'Invalid campaign id' }, { status: 400 })
  }

  try {
    const campaign = await fetchCampaign(onChainId)
    return NextResponse.json(campaign)
  } catch (error) {
    console.error(`Failed to load campaign ${params.id}`, error)
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
  }
}
