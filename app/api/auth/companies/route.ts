import { NextResponse } from 'next/server'
import { isAddress } from 'viem'
import { getPrisma, isDatabaseConfigured } from '@/lib/platform/db'
import {
  hashPassword,
  isAdminRequest,
  normalizeWallet,
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

  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const prisma = getPrisma()
  const items = (
    await prisma.companyAccount.findMany({
      orderBy: { createdAt: 'desc' },
    })
  ).map(toPublicCompany)

  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: 'Database is not configured' },
      { status: 503 },
    )
  }

  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const companyId = String(body?.companyId ?? '').trim()
  const name = String(body?.name ?? '').trim()
  const password = String(body?.password ?? '')
  const walletAddress = normalizeWallet(String(body?.walletAddress ?? ''))

  if (!companyId || !name || !password || !walletAddress) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  if (!isAddress(walletAddress)) {
    return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 })
  }

  const passwordHash = await hashPassword(password)
  const prisma = getPrisma()
  const existing = await prisma.companyAccount.findFirst({
    where: {
      OR: [
        { companyId },
        { walletAddress },
      ],
    },
  })

  if (existing) {
    return NextResponse.json(
      { error: 'Company ID or wallet address already registered' },
      { status: 409 },
    )
  }

  const account = await prisma.companyAccount.create({
    data: {
      companyId,
      name,
      walletAddress,
      passwordHash,
    },
  })

  return NextResponse.json(toPublicCompany(account), { status: 201 })
}
