import { NextResponse } from 'next/server'
import { getPrisma, isDatabaseConfigured } from '@/lib/platform/db'
import {
  PLATFORM_CHAIN_ID,
  PLATFORM_FACTORY_ADDRESS,
} from '@/lib/platform/config'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  let database: 'not_configured' | 'ok' | 'error' = 'not_configured'
  let lastSyncedBlock: number | null = null

  if (isDatabaseConfigured()) {
    try {
      const state = await getPrisma().indexerState.findUnique({
        where: { id: 1 },
      })
      database = 'ok'
      lastSyncedBlock = state?.lastSyncedBlock ?? null
    } catch {
      database = 'error'
    }
  }

  return NextResponse.json({
    ok: true,
    chainId: PLATFORM_CHAIN_ID,
    factoryAddress: PLATFORM_FACTORY_ADDRESS,
    database,
    lastSyncedBlock,
  })
}
