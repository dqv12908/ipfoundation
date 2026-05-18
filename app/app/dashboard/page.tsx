'use client'

import { useAccount, useBalance } from 'wagmi'
import Link from 'next/link'
import { ConnectWalletPrompt } from '@/components/platform/shared/ConnectWalletPrompt'
import { shortAddress } from '@/lib/platform/format'

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  if (!isConnected) {
    return (
      <div>
        <h1 className="mb-6 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          Portfolio
        </h1>
        <ConnectWalletPrompt message="Connect your wallet to view your portfolio." />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Portfolio
      </h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="panel p-5">
          <p className="text-xs text-text-muted">Wallet</p>
          <p className="mt-2 font-mono text-sm font-semibold text-accent">
            {address ? shortAddress(address) : '—'}
          </p>
        </div>
        <div className="panel p-5">
          <p className="text-xs text-text-muted">Balance</p>
          <p className="mt-2 text-xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
            {balance ? `${Number(balance.formatted).toFixed(4)}` : '—'}
            <span className="ml-1 text-xs text-text-muted">{balance?.symbol}</span>
          </p>
        </div>
        <div className="panel p-5">
          <p className="mb-3 text-xs text-text-muted">Quick Links</p>
          <div className="flex gap-2">
            <Link href="/app/dashboard/participations" className="btn-secondary flex-1 text-center text-xs">
              Participations
            </Link>
            <Link href="/app/dashboard/claims" className="btn-secondary flex-1 text-center text-xs">
              Claims
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
