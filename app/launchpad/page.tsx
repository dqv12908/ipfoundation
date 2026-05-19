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

const protocolChecks = [
  { label: 'Escrow', value: 'Không lưu ký', detail: 'Vốn khóa bằng hợp đồng' },
  { label: 'Kết quả', value: 'Nhị phân', detail: 'Đạt mốc hoặc hoàn tiền' },
  { label: 'Mạng', value: 'Sepolia', detail: 'Môi trường thử nghiệm' },
]

const protocolSteps = [
  {
    num: '01',
    title: 'Tạo chiến dịch',
    desc: 'Doanh nghiệp gửi chiến dịch IP với mục tiêu vốn, giá token và lịch gọi vốn rõ ràng.',
  },
  {
    num: '02',
    title: 'Góp vốn',
    desc: 'Nhà đầu tư cam kết ETH trong thời gian mở bán. Toàn bộ vốn được giữ trong escrow on-chain.',
  },
  {
    num: '03',
    title: 'Quyết toán',
    desc: 'Đạt mức tối thiểu thì phân phối token. Không đạt thì hoàn tiền đầy đủ.',
  },
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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
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
              Cam kết vốn vào các chiến dịch được bảo chứng bằng tài sản trí tuệ. Vốn được
              khóa bằng hợp đồng thông minh, kết quả nhị phân, hoàn toàn không lưu ký.
            </p>
          </div>

          <div className="panel-elevated overflow-hidden">
            <div className="border-b border-border px-5 py-4">
              <p className="label-caps text-accent">Bảng kiểm giao thức</p>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {protocolChecks.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="text-xs text-text-muted">{item.label}</p>
                    <p className="mt-1 text-sm text-text-secondary">{item.detail}</p>
                  </div>
                  <p
                    className="text-right text-sm font-bold text-text-primary"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 animate-slide-up">
        {[
          { label: 'Tổng chiến dịch', value: campaigns.length.toString(), detail: activeFilter },
          { label: 'Đang gọi vốn', value: liveCampaigns.toString(), detail: 'Cửa sổ cam kết mở' },
          { label: 'Tỷ lệ on-chain', value: '100%', detail: 'Escrow và phân phối' },
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

      <section className="border-t border-border pt-10 animate-slide-up">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-caps tracking-widest">Cơ chế hoạt động</p>
            <h2
              className="mt-2 text-2xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Từ hồ sơ IP đến quyết toán on-chain
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-text-muted">
            Launchpad giữ mô hình đơn giản: tạo chiến dịch, góp vốn, rồi quyết toán theo điều kiện đã công bố.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {protocolSteps.map((step, i) => (
            <div
              key={step.num}
              className={`bg-surface-2 p-6 animate-slide-up stagger-${i + 1}`}
            >
              <span className="text-xs font-semibold text-accent tabular-nums">{step.num}</span>
              <h3
                className="mt-3 text-base font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
