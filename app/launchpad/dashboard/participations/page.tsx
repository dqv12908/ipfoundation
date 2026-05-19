'use client'

import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { StatusBadge } from '@/components/platform/shared/StatusBadge'
import { ConnectWalletPrompt } from '@/components/platform/shared/ConnectWalletPrompt'
import { formatRaise, formatDate } from '@/lib/platform/format'
import type { ApiCommitment } from '@/lib/platform/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

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
          Khoản góp
        </h1>
        <ConnectWalletPrompt message="Kết nối ví để xem các khoản góp vốn." />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <Link href="/launchpad/dashboard" className="mb-4 inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Quay lại danh mục
      </Link>
      <h1 className="mb-6 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Khoản góp
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 rounded-full border-2 border-accent/20 border-t-accent" style={{ animation: 'spin 0.7s linear infinite' }} />
        </div>
      ) : commitments.length === 0 ? (
        <div className="panel py-14 text-center">
          <p className="text-sm text-text-muted">Bạn chưa tham gia chiến dịch nào.</p>
          <Link href="/launchpad" className="btn-primary mt-4 inline-block text-sm">Khám phá chiến dịch</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-white/[0.015]">
              <tr>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Chiến dịch</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Trạng thái</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Đã góp</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Đã nhận</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Ngày</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {commitments.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5">
                    <Link href={`/launchpad/campaigns/${c.campaign?.onChainId}`} className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                      {c.campaign?.name ?? `Chiến dịch #${c.campaignId}`}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5"><StatusBadge status={c.campaign?.status ?? 'CREATED'} /></td>
                  <td className="px-4 py-2.5 font-semibold tabular-nums">{formatRaise(c.amount)}</td>
                  <td className="px-4 py-2.5">
                    {c.claimed && <span className="text-positive text-xs font-medium">Token</span>}
                    {c.refunded && <span className="text-info text-xs font-medium">Hoàn tiền</span>}
                    {!c.claimed && !c.refunded && <span className="text-text-muted text-xs">Đang chờ</span>}
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
