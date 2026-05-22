import { NextResponse } from 'next/server'
import { getPrisma, isDatabaseConfigured } from '@/lib/platform/db'
import {
  createCompanyToken,
  toPublicCompany,
  verifyPassword,
} from '@/lib/platform/server-store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: 'Database is not configured' },
      { status: 503 },
    )
  }

  const body = await request.json().catch(() => null)
  const companyId = String(body?.companyId ?? '').trim()
  const password = String(body?.password ?? '')

  if (!companyId || !password) {
    return NextResponse.json(
      { error: 'Company ID and password are required' },
      { status: 400 },
    )
  }

  const prisma = getPrisma()
  const account = await prisma.companyAccount.findUnique({
    where: { companyId },
  })

  if (!account || !(await verifyPassword(password, account.passwordHash))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  return NextResponse.json({
    token: createCompanyToken(account),
    company: toPublicCompany(account),
  })
}
