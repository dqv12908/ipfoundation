import { NextResponse } from 'next/server'
import {
  fetchCampaigns,
  getPagination,
} from '@/lib/platform/onchain-api'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const { page, limit } = getPagination(url.searchParams)

  try {
    const result = await fetchCampaigns({
      status: url.searchParams.get('status'),
      page,
      limit,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to load campaigns', error)
    return NextResponse.json(
      { error: 'Failed to load campaigns' },
      { status: 502 },
    )
  }
}
