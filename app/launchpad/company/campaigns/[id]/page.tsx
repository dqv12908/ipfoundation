'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useWriteContract, useReadContract } from 'wagmi'
import { campaignAbi } from '@/lib/platform/generated'
import { StatusBadge } from '@/components/platform/shared/StatusBadge'
import { ProgressBar } from '@/components/platform/shared/ProgressBar'
import { TransactionButton } from '@/components/platform/shared/TransactionButton'
import { CompanyPostForm } from '@/components/platform/feed/CompanyPostForm'
import { useCompanyAuth } from '@/lib/platform/company-auth'
import { formatRaise, formatDate, campaignProgress } from '@/lib/platform/format'
import type { ApiCampaign, ApiPost } from '@/lib/platform/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export default function CompanyCampaignPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { company: companyAuth, token } = useCompanyAuth()
  const [campaign, setCampaign] = useState<ApiCampaign | null>(null)
  const [posts, setPosts] = useState<ApiPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/campaigns/${id}`)
      .then((r) => r.json())
      .then((data) => setCampaign(data))
      .catch(() => setCampaign(null))
      .finally(() => setLoading(false))
  }, [id])

  // Fetch campaign posts
  useEffect(() => {
    if (!campaign) return
    fetch(`${API_URL}/api/posts?tab=global&limit=50`)
      .then((r) => r.json())
      .then((data) => {
        const campaignPosts = (data.items ?? []).filter(
          (p: ApiPost) => p.campaignId === campaign.id,
        )
        setPosts(campaignPosts)
      })
      .catch(() => {})
  }, [campaign])

  const contractAddress = campaign?.contractAddress as `0x${string}` | undefined

  const { data: fundsWithdrawn } = useReadContract({
    address: contractAddress,
    abi: campaignAbi,
    functionName: 'fundsWithdrawn',
  })

  const { data: withdrawHash, isPending: withdrawPending, writeContract } = useWriteContract()

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
        <Link href="/launchpad/company" className="btn-secondary mt-4 inline-block text-sm">Back</Link>
      </div>
    )
  }

  const isCompany = companyAuth && campaign.company.toLowerCase() === companyAuth.walletAddress.toLowerCase()
  const canWithdraw = isCompany && campaign.successful && campaign.finalized && !fundsWithdrawn
  const progress = campaignProgress(campaign.totalCommitted, campaign.maxRaise)

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <Link href="/launchpad/company" className="mb-6 inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Company Portal
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            {campaign.name}
          </h1>
          <p className="text-xs text-text-muted">{campaign.symbol}</p>
        </div>
        <StatusBadge status={campaign.status} />
      </div>

      <div className="mb-5 panel p-5">
        <ProgressBar percent={progress} label="Raise Progress" />
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {[
            { label: 'Raised', value: formatRaise(campaign.totalCommitted), color: 'text-positive' },
            { label: 'Min', value: formatRaise(campaign.minRaise) },
            { label: 'Max', value: formatRaise(campaign.maxRaise) },
            { label: 'Investors', value: String(campaign._count?.commitments ?? 0) },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xs text-text-muted">{stat.label}</p>
              <p className={`mt-0.5 font-semibold tabular-nums ${stat.color ?? ''}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 panel p-5">
        <p className="label-caps mb-3">Timeline</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-text-muted">Start</p>
            <p className="mt-0.5 font-semibold">{formatDate(campaign.startTime)}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted">End</p>
            <p className="mt-0.5 font-semibold">{formatDate(campaign.endTime)}</p>
          </div>
        </div>
      </div>

      {canWithdraw && contractAddress && (
        <div className="panel p-5" style={{ borderColor: 'rgba(0,216,151,0.15)' }}>
          <p className="label-caps mb-1 text-positive">Withdraw Funds</p>
          <p className="mb-4 text-sm text-text-secondary">
            Campaign was successful. You can withdraw the accepted funds.
          </p>
          <TransactionButton
            hash={withdrawHash}
            isPending={withdrawPending}
            onClick={() =>
              writeContract({
                address: contractAddress,
                abi: campaignAbi,
                functionName: 'withdrawFunds',
              })
            }
          >
            Withdraw {formatRaise(
              BigInt(campaign.totalCommitted) > BigInt(campaign.maxRaise)
                ? campaign.maxRaise
                : campaign.totalCommitted,
            )}
          </TransactionButton>
        </div>
      )}

      {fundsWithdrawn && (
        <div className="rounded-xl border border-positive/15 bg-positive/5 p-5">
          <div className="flex items-center gap-1.5 text-sm text-positive">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Funds withdrawn successfully.
          </div>
        </div>
      )}

      {/* Updates section */}
      {isCompany && (
        <div className="mt-8">
          <p className="label-caps mb-4">Updates</p>
          <CompanyPostForm
            campaignId={campaign.id}
            company={companyAuth!.walletAddress}
            token={token}
            onPosted={(post) => setPosts((prev) => [post, ...prev])}
          />
          {posts.length > 0 && (
            <div className="mt-4 space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="panel p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-primary">
                    {post.content}
                  </p>
                  <p className="mt-2 text-xs text-text-muted">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
