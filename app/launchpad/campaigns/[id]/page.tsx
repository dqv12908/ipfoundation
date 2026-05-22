'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { CampaignDetail } from '@/components/platform/campaign/CampaignDetail'
import type { ApiCampaign } from '@/lib/platform/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [campaign, setCampaign] = useState<ApiCampaign | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/campaigns/${id}`)
      .then((r) => r.json())
      .then((data) => setCampaign(data))
      .catch(() => setCampaign(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center py-20 animate-fade-in">
        <div className="h-6 w-6 rounded-full border-2 border-accent/20 border-t-accent" style={{ animation: 'spin 0.7s linear infinite' }} />
        <p className="mt-3 text-sm text-text-secondary">Loading campaign...</p>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="flex flex-col items-center py-20 text-center animate-fade-in">
        <p className="text-sm text-text-secondary">Campaign not found</p>
        <Link href="/launchpad" className="btn-secondary mt-4 text-sm">
          Back to Explore
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link href="/launchpad" className="mb-6 inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors">
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Explore
      </Link>
      <CampaignDetail campaign={campaign} />
    </div>
  )
}
