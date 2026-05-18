'use client'

import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AllocationDisplay } from '@/components/platform/campaign/AllocationDisplay'
import { ConnectWalletPrompt } from '@/components/platform/shared/ConnectWalletPrompt'
import type { ApiCommitment } from '@/lib/platform/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export default function ClaimsPage() {
  const { address, isConnected } = useAccount()
  const [commitments, setCommitments] = useState<ApiCommitment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!address) return
    fetch(`${API_URL}/api/participations?investor=${address}`)
      .then((r) => r.json())
      .then((data) => setCommitments(data.items ?? []))
      .catch(() => setCommitments([]))
      .finally(() => setLoading(false))
  }, [address])

  if (!isConnected) {
    return (
      <div>
        <h1 className="mb-6 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Claims</h1>
        <ConnectWalletPrompt message="Connect your wallet to view claims." />
      </div>
    )
  }

  const uniqueCampaigns = commitments.reduce(
    (acc, c) => {
      const key = c.campaign?.contractAddress
      if (key && !acc.has(key)) acc.set(key, c.campaign!)
      return acc
    },
    new Map<string, NonNullable<ApiCommitment['campaign']>>(),
  )

  return (
    <div className="animate-fade-in">
      <Link href="/app/dashboard" className="mb-4 inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Portfolio
      </Link>
      <h1 className="mb-6 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Claims
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 rounded-full border-2 border-accent/20 border-t-accent" style={{ animation: 'spin 0.7s linear infinite' }} />
        </div>
      ) : uniqueCampaigns.size === 0 ? (
        <div className="panel py-14 text-center">
          <p className="text-sm text-text-muted">No active campaigns to claim from.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {Array.from(uniqueCampaigns.entries()).map(([contractAddress, campaign]) => (
            <div key={contractAddress}>
              <div className="mb-2 flex items-center gap-2">
                <Link
                  href={`/app/campaigns/${campaign.onChainId}`}
                  className="text-sm font-bold text-accent hover:text-accent/80 transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {campaign.name}
                </Link>
                <span className="text-xs text-text-muted">${campaign.symbol}</span>
              </div>
              <AllocationDisplay
                campaignAddress={contractAddress as `0x${string}`}
                investor={address!}
                finalized={campaign.status === 'FINALIZED_SUCCESS' || campaign.status === 'FINALIZED_FAIL'}
                successful={campaign.status === 'FINALIZED_SUCCESS'}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
