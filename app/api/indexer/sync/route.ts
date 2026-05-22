import { NextResponse } from 'next/server'
import { isDatabaseConfigured } from '@/lib/platform/db'
import { syncOnChainEvents } from '@/lib/platform/indexer-sync'
import { isIndexerRequest } from '@/lib/platform/server-store'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 60

export async function GET(request: Request) {
  if (!isIndexerRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: 'DATABASE_URL is not configured' },
      { status: 503 },
    )
  }

  try {
    const result = await syncOnChainEvents()
    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    console.error('Indexer sync failed', error)
    return NextResponse.json({ error: 'Indexer sync failed' }, { status: 500 })
  }
}

export const POST = GET
