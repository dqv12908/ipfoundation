'use client'

import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { StatusBadge } from '@/components/platform/shared/StatusBadge'
import { ConnectWalletPrompt } from '@/components/platform/shared/ConnectWalletPrompt'
import { formatRaise, formatDate } from '@/lib/platform/format'
import type { ApiCommitment } from '@/lib/platform/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export default function ParticipationsPage() {
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
        <h1 className="mb-6 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          Participations
        </h1>
        <ConnectWalletPrompt message="Connect your wallet to view participations." />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <Link href="/app/dashboard" className="mb-4 inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Portfolio
      </Link>
      <h1 className="mb-6 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Participations
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 rounded-full border-2 border-accent/20 border-t-accent" style={{ animation: 'spin 0.7s linear infinite' }} />
        </div>
      ) : commitments.length === 0 ? (
        <div className="panel py-14 text-center">
          <p className="text-sm text-text-muted">No participations yet.</p>
          <Link href="/app" className="btn-primary mt-4 inline-block text-sm">Explore Campaigns</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-white/[0.015]">
              <tr>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Campaign</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Status</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Committed</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Claimed</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {commitments.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5">
                    <Link href={`/app/campaigns/${c.campaign?.onChainId}`} className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                      {c.campaign?.name ?? `Campaign #${c.campaignId}`}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5"><StatusBadge status={c.campaign?.status ?? 'CREATED'} /></td>
                  <td className="px-4 py-2.5 font-semibold tabular-nums">{formatRaise(c.amount)}</td>
                  <td className="px-4 py-2.5">
                    {c.claimed && <span className="text-positive text-xs font-medium">Tokens</span>}
                    {c.refunded && <span className="text-info text-xs font-medium">Refund</span>}
                    {!c.claimed && !c.refunded && <span className="text-text-muted text-xs">Pending</span>}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-text-muted">{formatDate(c.createdAt as unknown as string)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
