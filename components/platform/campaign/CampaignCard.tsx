'use client'

import Link from 'next/link'
import { GlowCard } from '@/components/platform/ui/GlowCard'
import { StatusBadge } from '@/components/platform/shared/StatusBadge'
import { ProgressBar } from '@/components/platform/shared/ProgressBar'
import { formatRaise, formatDate, campaignProgress } from '@/lib/platform/format'
import type { ApiCampaign } from '@/lib/platform/api'

const glowColors: Record<string, string> = {
  LIVE: 'rgba(0,216,151,0.06)',
  APPROVED: 'rgba(91,141,239,0.06)',
  FINALIZED_SUCCESS: 'rgba(0,216,151,0.06)',
  FINALIZED_FAIL: 'rgba(255,77,106,0.05)',
  CREATED: 'rgba(245,166,35,0.05)',
}

export function CampaignCard({ campaign, index = 0 }: { campaign: ApiCampaign; index?: number }) {
  const progress = campaignProgress(campaign.totalCommitted, campaign.maxRaise)
  const glowColor = glowColors[campaign.status] ?? 'rgba(201,168,76,0.06)'

  return (
    <Link href={`/app/campaigns/${campaign.onChainId}`} className="block">
      <GlowCard
        className={`cursor-pointer p-5 animate-slide-up stagger-${Math.min(index + 1, 6)}`}
        glowColor={glowColor}
      >
        <div className="mb-3 flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3
              className="truncate text-[0.9375rem] font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {campaign.name}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-accent">${campaign.symbol}</p>
          </div>
          <div className="ml-3 flex-shrink-0">
            <StatusBadge status={campaign.status} />
          </div>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white/[0.025] px-3 py-2">
            <p className="text-[0.625rem] font-medium text-text-muted">Min Raise</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">{formatRaise(campaign.minRaise)}</p>
          </div>
          <div className="rounded-lg bg-white/[0.025] px-3 py-2">
            <p className="text-[0.625rem] font-medium text-text-muted">Max Raise</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">{formatRaise(campaign.maxRaise)}</p>
          </div>
        </div>

        <ProgressBar percent={progress} />

        <div className="mt-2.5 flex items-center justify-between text-xs text-text-muted">
          <span className="tabular-nums">{formatRaise(campaign.totalCommitted)} raised</span>
          <span className="flex items-center gap-1 tabular-nums">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228A2 2 0 013 17.208V14.5a2 2 0 012-2h.5M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07m0 0A5.5 5.5 0 009 7.5a5.5 5.5 0 00-4.786 8.558m9.572 0H5.5" />
            </svg>
            {campaign._count?.commitments ?? 0}
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.04] pt-2.5 text-[0.6875rem] text-text-muted">
          <span>{formatDate(campaign.startTime)}</span>
          <svg className="h-3 w-3 text-text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          <span>{formatDate(campaign.endTime)}</span>
        </div>
      </GlowCard>
    </Link>
  )
}
