import { NextResponse } from 'next/server'
import { paginate } from '@/lib/platform/onchain-api'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(paginate([], 1, 100))
}

export async function POST() {
  return NextResponse.json(
    { error: 'Company account storage is not configured on this deployment' },
    { status: 503 },
  )
}
