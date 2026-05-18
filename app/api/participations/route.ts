import { NextResponse } from 'next/server'
import {
  fetchInvestorParticipations,
  getPagination,
  paginate,
} from '@/lib/platform/onchain-api'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const investor = url.searchParams.get('investor')
  const { page, limit } = getPagination(url.searchParams)

  if (!investor) {
    return NextResponse.json(paginate([], page, limit))
  }

  try {
    const participations = await fetchInvestorParticipations(investor)
    return NextResponse.json(paginate(participations, page, limit))
  } catch (error) {
    console.error('Failed to load participations', error)
    return NextResponse.json(
      { error: 'Failed to load participations' },
      { status: 502 },
    )
  }
}
