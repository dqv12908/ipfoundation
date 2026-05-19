'use client'

import { useState, useEffect } from 'react'
import { CampaignCard } from '@/components/platform/campaign/CampaignCard'
import { CardSkeleton } from '@/components/platform/shared/Skeleton'
import { ErrorMessage } from '@/components/platform/shared/ErrorMessage'
import type { ApiCampaign, PaginatedResponse } from '@/lib/platform/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

const filters = [
  { value: '', label: 'Tất cả' },
  { value: 'APPROVED', label: 'Sắp mở' },
  { value: 'LIVE', label: 'Đang gọi vốn' },
  { value: 'ENDED', label: 'Đã kết thúc' },
  { value: 'FINALIZED_SUCCESS', label: 'Thành công' },
  { value: 'FINALIZED_FAIL', label: 'Thất bại' },
]

export default function ExplorePage() {
  const [status, setStatus] = useState('')
  const [campaigns, setCampaigns] = useState<ApiCampaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  function fetchCampaigns() {
    setLoading(true)
    setError(null)
    const params = status ? `?status=${status}` : ''
    fetch(`${API_URL}/api/campaigns${params}`)
      .then((r) => {
        if (!r.ok) throw new Error(`API trả về mã ${r.status}`)
        return r.json() as Promise<PaginatedResponse<ApiCampaign>>
      })
      .then((data) => setCampaigns(data.items))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchCampaigns()
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  const liveCampaigns = campaigns.filter((campaign) => campaign.status === 'LIVE').length
  const activeFilter = filters.find((filter) => filter.value === status)?.label ?? 'Tất cả'

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden border-b border-border pb-10 pt-8 animate-fade-in">
        <div>
          <p className="label-caps mb-4 tracking-widest text-accent">Huy động vốn IP mã hóa</p>
          <h1
            className="max-w-5xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.05]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Đầu tư vào ý tưởng,{' '}
            <span className="accent-text">trước khi thế giới nhận ra.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-text-secondary">
            Cam kết vốn vào các chiến dịch được bảo chứng bằng tài sản trí tuệ.
          </p>
        </div>
      </section>

      <section className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 animate-slide-up">
        {[
          { label: 'Tổng chiến dịch', value: campaigns.length.toString(), detail: activeFilter },
          { label: 'Đang gọi vốn', value: liveCampaigns.toString(), detail: 'Cửa sổ cam kết mở' },
        ].map((metric) => (
          <div key={metric.label} className="bg-surface-2 px-5 py-4">
            <p className="text-xs text-text-muted">{metric.label}</p>
            <p
              className="mt-2 text-2xl font-bold tabular-nums text-text-primary"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {metric.value}
            </p>
            <p className="mt-1 text-xs text-text-muted">{metric.detail}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="label-caps tracking-widest">Danh sách chiến dịch</p>
          <p className="mt-1 text-sm text-text-secondary">
            Lọc theo trạng thái để xem các chiến dịch IP đang mở hoặc đã quyết toán.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-white/[0.02] p-1.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={`rounded-md px-3 py-1.5 text-[0.8125rem] font-medium transition-all duration-150 ${
                status === f.value
                  ? 'bg-accent text-white shadow-sm shadow-accent/20'
                  : 'text-text-secondary hover:bg-white/[0.04] hover:text-text-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        {error ? (
          <ErrorMessage message={error} retry={fetchCampaigns} />
        ) : loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="panel flex flex-col items-center px-6 py-16 text-center animate-fade-in">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
              <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-text-primary">Chưa có chiến dịch phù hợp</p>
            <p className="mt-2 max-w-sm text-sm text-text-muted">
              {status ? 'Thử một bộ lọc khác để mở rộng danh sách.' : 'Các chiến dịch IP mới sẽ xuất hiện tại đây sau khi được phê duyệt.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((c, i) => (
              <CampaignCard key={c.onChainId} campaign={c} index={i} />
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
