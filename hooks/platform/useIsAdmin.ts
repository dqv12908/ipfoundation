'use client'

import { useAccount, useReadContract } from 'wagmi'
import { campaignFactoryAbi } from '@/lib/platform/generated'
import { CAMPAIGN_ADMIN_ROLE } from '@/lib/platform/shared'

const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}` | undefined

export function useIsAdmin() {
  const { address } = useAccount()

  const { data: isAdmin } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: campaignFactoryAbi,
    functionName: 'hasRole',
    args: address ? [CAMPAIGN_ADMIN_ROLE, address] : undefined,
    query: { enabled: !!address && !!FACTORY_ADDRESS },
  })

  return { isAdmin: !!isAdmin, address }
}
