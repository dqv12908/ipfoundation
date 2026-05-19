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
          Danh mục
        </h1>
        <ConnectWalletPrompt message="Kết nối ví để xem danh mục của bạn." />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Danh mục
      </h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="panel p-5">
          <p className="text-xs text-text-muted">Ví</p>
          <p className="mt-2 font-mono text-sm font-semibold text-accent">
            {address ? shortAddress(address) : '—'}
          </p>
        </div>
        <div className="panel p-5">
          <p className="text-xs text-text-muted">Số dư</p>
          <p className="mt-2 text-xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
            {balance ? `${Number(balance.formatted).toFixed(4)}` : '—'}
            <span className="ml-1 text-xs text-text-muted">{balance?.symbol}</span>
          </p>
        </div>
        <div className="panel p-5">
          <p className="mb-3 text-xs text-text-muted">Liên kết nhanh</p>
          <div className="flex gap-2">
            <Link href="/launchpad/dashboard/participations" className="btn-secondary flex-1 text-center text-xs">
              Khoản góp
            </Link>
            <Link href="/launchpad/dashboard/claims" className="btn-secondary flex-1 text-center text-xs">
              Quyền nhận
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
