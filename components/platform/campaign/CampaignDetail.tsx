'use client'

import { useAccount, useReadContract } from 'wagmi'
import { campaignAbi } from '@/lib/platform/generated'
import { StatusBadge } from '@/components/platform/shared/StatusBadge'
import { ProgressBar } from '@/components/platform/shared/ProgressBar'
import { CommitPanel } from './CommitPanel'
import { AllocationDisplay } from './AllocationDisplay'
import { formatRaise, formatDate, campaignProgress, shortAddress } from '@/lib/platform/format'
import type { ApiCampaign } from '@/lib/platform/api'

const statusMap: Record<number, string> = {
  0: 'CREATED',
  1: 'APPROVED',
  2: 'REJECTED',
  3: 'LIVE',
  4: 'ENDED',
  5: 'FINALIZED_SUCCESS',
}

export function CampaignDetail({ campaign }: { campaign: ApiCampaign }) {
  const { address } = useAccount()
  const contractAddress = campaign.contractAddress as `0x${string}`

  const { data: onChainStatus } = useReadContract({
    address: contractAddress,
    abi: campaignAbi,
    functionName: 'getStatus',
  })

  const { data: totalCommitted } = useReadContract({
    address: contractAddress,
    abi: campaignAbi,
    functionName: 'totalCommitted',
  })

  const liveTotal = totalCommitted ? totalCommitted.toString() : campaign.totalCommitted
  const liveStatus =
    onChainStatus !== undefined ? statusMap[Number(onChainStatus)] ?? campaign.status : campaign.status
  const progress = campaignProgress(liveTotal, campaign.maxRaise)
  const isETH = campaign.acceptedAsset === '0x0000000000000000000000000000000000000000'

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-1.5 flex items-center gap-3">
            <h1
              className="text-2xl font-extrabold tracking-tight sm:text-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {campaign.name}
            </h1>
            <StatusBadge status={liveStatus} />
          </div>
          <p className="text-sm font-medium text-accent">${campaign.symbol}</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-5 lg:col-span-2">
          {campaign.description && (
            <p className="text-sm leading-relaxed text-text-secondary">{campaign.description}</p>
          )}

          {/* Raise progress */}
          <div className="panel p-5">
            <p className="label-caps mb-4">Raise Progress</p>
            <ProgressBar percent={progress} label="Funded" />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-white/[0.025] p-3">
                <p className="text-[0.625rem] font-medium text-text-muted">Raised</p>
                <p className="mt-1 text-base font-bold tabular-nums text-positive">{formatRaise(liveTotal)}</p>
              </div>
              <div className="rounded-lg bg-white/[0.025] p-3">
                <p className="text-[0.625rem] font-medium text-text-muted">Min Raise</p>
                <p className="mt-1 text-sm font-semibold tabular-nums">{formatRaise(campaign.minRaise)}</p>
              </div>
              <div className="rounded-lg bg-white/[0.025] p-3">
                <p className="text-[0.625rem] font-medium text-text-muted">Max Raise</p>
                <p className="mt-1 text-sm font-semibold tabular-nums">{formatRaise(campaign.maxRaise)}</p>
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="panel p-5">
            <p className="label-caps mb-4">Campaign Details</p>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Token Price', value: formatRaise(campaign.tokenPrice) },
                { label: 'Accepted Asset', value: isETH ? 'ETH' : shortAddress(campaign.acceptedAsset) },
                { label: 'Start', value: formatDate(campaign.startTime) },
                { label: 'End', value: formatDate(campaign.endTime) },
                { label: 'Company', value: shortAddress(campaign.company), mono: true },
                { label: 'Contract', value: shortAddress(campaign.contractAddress), mono: true },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs text-text-muted">{item.label}</dt>
                  <dd className={`mt-0.5 font-semibold ${item.mono ? 'font-mono text-sm text-accent/70' : ''}`}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <CommitPanel
            campaignAddress={contractAddress}
            status={liveStatus}
            acceptedAsset={campaign.acceptedAsset}
          />
          {address && (
            <AllocationDisplay
              campaignAddress={contractAddress}
              investor={address}
              finalized={campaign.finalized}
              successful={campaign.successful}
            />
          )}
        </div>
      </div>
    </div>
  )
}
