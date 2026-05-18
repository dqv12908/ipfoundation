import { NextResponse } from 'next/server'
import {
  PLATFORM_CHAIN_ID,
  PLATFORM_FACTORY_ADDRESS,
} from '@/lib/platform/config'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    ok: true,
    chainId: PLATFORM_CHAIN_ID,
    factoryAddress: PLATFORM_FACTORY_ADDRESS,
  })
}
