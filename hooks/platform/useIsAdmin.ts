'use client'

import { useAccount, useReadContract } from 'wagmi'
import { campaignFactoryAbi } from '@/lib/platform/generated'
import { CAMPAIGN_ADMIN_ROLE } from '@/lib/platform/shared'
import { PLATFORM_FACTORY_ADDRESS } from '@/lib/platform/config'

export function useIsAdmin() {
  const { address } = useAccount()

  const { data: isAdmin } = useReadContract({
    address: PLATFORM_FACTORY_ADDRESS,
    abi: campaignFactoryAbi,
    functionName: 'hasRole',
    args: address ? [CAMPAIGN_ADMIN_ROLE, address] : undefined,
    query: { enabled: !!address },
  })

  return { isAdmin: !!isAdmin, address }
}
