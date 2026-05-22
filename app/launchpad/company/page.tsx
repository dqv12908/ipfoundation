'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CampaignCard } from '@/components/platform/campaign/CampaignCard'
import { useCompanyAuth } from '@/lib/platform/company-auth'
import type { ApiCampaign, PaginatedResponse } from '@/lib/platform/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export default function CompanyPage() {
  const { company, logout } = useCompanyAuth()
  const [campaigns, setCampaigns] = useState<ApiCampaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!company) return
    fetch(`${API_URL}/api/campaigns?limit=100`)
      .then((r) => r.json() as Promise<PaginatedResponse<ApiCampaign>>)
      .then((data) =>
        setCampaigns(
          data.items.filter(
            (c) =>
              c.company.toLowerCase() ===
              company.walletAddress.toLowerCase(),
          ),
        ),
      )
      .catch(() => setCampaigns([]))
      .finally(() => setLoading(false))
  }, [company])

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {company?.name ?? 'Company Portal'}
          </h1>
          <p className="mt-0.5 text-xs text-text-muted">
            Signed in as{' '}
            <span className="text-accent">{company?.companyId}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/launchpad/company/campaigns/new" className="btn-primary text-sm">
            Create Campaign
          </Link>
          <button onClick={logout} className="btn-secondary text-sm">
            Sign Out
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div
            className="h-6 w-6 rounded-full border-2 border-accent/20 border-t-accent"
            style={{ animation: 'spin 0.7s linear infinite' }}
          />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="panel py-14 text-center">
          <svg
            className="mx-auto mb-3 h-8 w-8 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <p className="text-sm text-text-secondary">
            No campaigns created yet.
          </p>
          <Link
            href="/launchpad/company/campaigns/new"
            className="btn-primary mt-4 inline-block text-sm"
          >
            Create your first campaign
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c, i) => (
            <CampaignCard key={c.onChainId} campaign={c} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
