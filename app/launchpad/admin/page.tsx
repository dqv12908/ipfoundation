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
          Bảng quản trị
        </h1>
        <ConnectWalletPrompt message="Kết nối ví quản trị để truy cập bảng điều khiển." />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Bảng quản trị
      </h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="panel p-5">
          <p className="text-xs text-text-muted">Tổng chiến dịch</p>
          <p className="mt-2 text-2xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
            {campaignCount?.toString() ?? '—'}
          </p>
        </div>
        <div className="panel p-5">
          <p className="text-xs text-text-muted">Trạng thái nền tảng</p>
          <p className={`mt-2 text-lg font-bold ${paused ? 'text-negative' : 'text-positive'}`}>
            {paused === undefined ? '—' : paused ? 'Tạm dừng' : 'Hoạt động'}
          </p>
        </div>
        <div className="panel p-5">
          <p className="mb-3 text-xs text-text-muted">Thao tác nhanh</p>
          <div className="flex flex-col gap-2">
            <Link href="/launchpad/admin/campaigns" className="btn-secondary text-center text-sm">
              Hàng chờ duyệt
            </Link>
            <Link href="/launchpad/admin/companies" className="btn-secondary text-center text-sm">
              Tài khoản doanh nghiệp
            </Link>
            <Link href="/launchpad/admin/controls" className="btn-secondary text-center text-sm">
              Điều khiển khẩn cấp
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
