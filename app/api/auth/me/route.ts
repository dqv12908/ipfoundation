import { NextResponse } from 'next/server'
import { getPrisma, isDatabaseConfigured } from '@/lib/platform/db'
import {
  requireCompanyToken,
  toPublicCompany,
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

  const payload = requireCompanyToken(request)
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const prisma = getPrisma()
  const account = await prisma.companyAccount.findUnique({
    where: { id: payload.sub },
  })
  if (!account) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  }

  return NextResponse.json(toPublicCompany(account))
}
