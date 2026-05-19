'use client'

import { useAccount, useReadContract } from 'wagmi'
import Link from 'next/link'
import { campaignFactoryAbi } from '@/lib/platform/generated'
import { PLATFORM_FACTORY_ADDRESS } from '@/lib/platform/config'
import { ConnectWalletPrompt } from '@/components/platform/shared/ConnectWalletPrompt'

export default function AdminPage() {
  const { isConnected } = useAccount()

  const { data: campaignCount } = useReadContract({
    address: PLATFORM_FACTORY_ADDRESS,
    abi: campaignFactoryAbi,
    functionName: 'campaignCount',
  })

  const { data: paused } = useReadContract({
    address: PLATFORM_FACTORY_ADDRESS,
    abi: campaignFactoryAbi,
    functionName: 'paused',
  })

  if (!isConnected) {
    return (
      <div>
        <h1 className="mb-6 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          Admin Dashboard
        </h1>
        <ConnectWalletPrompt message="Connect your admin wallet to access the dashboard." />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Admin Dashboard
      </h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="panel p-5">
          <p className="text-xs text-text-muted">Total Campaigns</p>
          <p className="mt-2 text-2xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
            {campaignCount?.toString() ?? '—'}
          </p>
        </div>
        <div className="panel p-5">
          <p className="text-xs text-text-muted">Platform Status</p>
          <p className={`mt-2 text-lg font-bold ${paused ? 'text-negative' : 'text-positive'}`}>
            {paused === undefined ? '—' : paused ? 'Paused' : 'Active'}
          </p>
        </div>
        <div className="panel p-5">
          <p className="mb-3 text-xs text-text-muted">Quick Actions</p>
          <div className="flex flex-col gap-2">
            <Link href="/launchpad/admin/campaigns" className="btn-secondary text-center text-sm">
              Review Queue
            </Link>
            <Link href="/launchpad/admin/companies" className="btn-secondary text-center text-sm">
              Company Accounts
            </Link>
            <Link href="/launchpad/admin/controls" className="btn-secondary text-center text-sm">
              Emergency Controls
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
