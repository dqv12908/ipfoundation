'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { StatusBadge } from '@/components/platform/shared/StatusBadge'
import { formatRaise, formatDate, shortAddress } from '@/lib/platform/format'
import type { ApiCampaign, PaginatedResponse } from '@/lib/platform/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<ApiCampaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/campaigns?limit=100`)
      .then((r) => r.json() as Promise<PaginatedResponse<ApiCampaign>>)
      .then((data) => setCampaigns(data.items))
      .catch(() => setCampaigns([]))
      .finally(() => setLoading(false))
  }, [])

  const sorted = [...campaigns].sort((a, b) => {
    if (a.status === 'CREATED' && b.status !== 'CREATED') return -1
    if (a.status !== 'CREATED' && b.status === 'CREATED') return 1
    return 0
  })

  const pending = sorted.filter((c) => c.status === 'CREATED').length

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          Campaign Review
        </h1>
        {pending > 0 && (
          <span className="rounded-md bg-caution/10 border border-caution/15 px-2.5 py-0.5 text-xs font-semibold text-caution tabular-nums">
            {pending} pending
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 rounded-full border-2 border-accent/20 border-t-accent" style={{ animation: 'spin 0.7s linear infinite' }} />
        </div>
      ) : sorted.length === 0 ? (
        <div className="panel py-12 text-center">
          <p className="text-sm text-text-muted">No campaigns to review.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-white/[0.015]">
              <tr>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">ID</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Name</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Company</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Status</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Raise</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Timeline</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {sorted.map((c) => (
                <tr key={c.onChainId} className={`transition-colors hover:bg-white/[0.02] ${c.status === 'CREATED' ? 'bg-caution/[0.02]' : ''}`}>
                  <td className="px-4 py-2.5 font-mono text-xs text-text-muted">#{c.onChainId}</td>
                  <td className="px-4 py-2.5 font-semibold text-sm">{c.name}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-accent/60">{shortAddress(c.company)}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-2.5 text-text-secondary text-xs tabular-nums">{formatRaise(c.minRaise)} — {formatRaise(c.maxRaise)}</td>
                  <td className="px-4 py-2.5 text-text-muted text-[0.6875rem]">{formatDate(c.startTime)}</td>
                  <td className="px-4 py-2.5">
                    <Link href={`/launchpad/admin/campaigns/${c.onChainId}`} className="text-xs font-medium text-accent hover:text-accent/80 transition-colors">
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
