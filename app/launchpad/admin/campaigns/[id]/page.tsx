'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { useWriteContract } from 'wagmi'
import { campaignFactoryAbi } from '@/lib/platform/generated'
import { StatusBadge } from '@/components/platform/shared/StatusBadge'
import { ProgressBar } from '@/components/platform/shared/ProgressBar'
import { TransactionButton } from '@/components/platform/shared/TransactionButton'
import { formatRaise, formatDate, shortAddress, campaignProgress } from '@/lib/platform/format'
import type { ApiCampaign } from '@/lib/platform/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''
const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}` | undefined

export default function AdminCampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [campaign, setCampaign] = useState<ApiCampaign | null>(null)
  const [loading, setLoading] = useState(true)

  const { data: approveHash, isPending: approvePending, writeContract: writeApprove } = useWriteContract()
  const { data: rejectHash, isPending: rejectPending, writeContract: writeReject } = useWriteContract()

  useEffect(() => {
    fetch(`${API_URL}/api/campaigns/${id}`)
      .then((r) => r.json())
      .then((data) => setCampaign(data))
      .catch(() => setCampaign(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 rounded-full border-2 border-accent/20 border-t-accent" style={{ animation: 'spin 0.7s linear infinite' }} />
      </div>
    )
  }
  if (!campaign) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-text-muted">Campaign not found.</p>
        <Link href="/launchpad/admin/campaigns" className="btn-secondary mt-4 inline-block text-sm">Back</Link>
      </div>
    )
  }

  const isPending = campaign.status === 'CREATED'
  const progress = campaignProgress(campaign.totalCommitted, campaign.maxRaise)

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <Link href="/launchpad/admin/campaigns" className="mb-6 inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Review Queue
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            {campaign.name}
          </h1>
          <p className="text-xs text-text-muted">{campaign.symbol} — Campaign #{campaign.onChainId}</p>
        </div>
        <StatusBadge status={campaign.status} />
      </div>

      <div className="mb-5 panel p-5">
        <p className="label-caps mb-4">Campaign Details</p>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: 'Company', value: shortAddress(campaign.company), mono: true },
            { label: 'Contract', value: shortAddress(campaign.contractAddress), mono: true },
            { label: 'Min Raise', value: formatRaise(campaign.minRaise) },
            { label: 'Max Raise', value: formatRaise(campaign.maxRaise) },
            { label: 'Token Price', value: formatRaise(campaign.tokenPrice) },
            { label: 'Accepted Asset', value: campaign.acceptedAsset === '0x0000000000000000000000000000000000000000' ? 'ETH' : shortAddress(campaign.acceptedAsset) },
            { label: 'Start', value: formatDate(campaign.startTime) },
            { label: 'End', value: formatDate(campaign.endTime) },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-xs text-text-muted">{item.label}</dt>
              <dd className={`mt-0.5 font-semibold ${item.mono ? 'font-mono text-sm text-accent/60' : ''}`}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {!isPending && (
        <div className="mb-5 panel p-5">
          <ProgressBar percent={progress} label="Raise Progress" />
          <p className="mt-2 text-xs text-text-muted tabular-nums">
            {formatRaise(campaign.totalCommitted)} raised — {campaign._count?.commitments ?? 0} investors
          </p>
        </div>
      )}

      {isPending && FACTORY_ADDRESS && (
        <div className="rounded-xl border border-caution/15 bg-caution/5 p-5">
          <p className="label-caps mb-1 text-caution">Pending Review</p>
          <p className="mb-4 text-sm text-text-secondary">
            Review the details above and approve or reject this campaign.
          </p>
          <div className="flex gap-3">
            <div className="flex-1">
              <TransactionButton
                hash={approveHash}
                isPending={approvePending}
                onClick={() =>
                  writeApprove({
                    address: FACTORY_ADDRESS,
                    abi: campaignFactoryAbi,
                    functionName: 'approveCampaign',
                    args: [BigInt(campaign.onChainId)],
                  })
                }
              >
                Approve
              </TransactionButton>
            </div>
            <div className="flex-1">
              <TransactionButton
                hash={rejectHash}
                isPending={rejectPending}
                variant="danger"
                onClick={() =>
                  writeReject({
                    address: FACTORY_ADDRESS,
                    abi: campaignFactoryAbi,
                    functionName: 'rejectCampaign',
                    args: [BigInt(campaign.onChainId)],
                  })
                }
              >
                Reject
              </TransactionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
