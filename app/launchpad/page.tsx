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

  return (
    <div>
      <div className="mb-12 pt-10 animate-fade-in">
        <p className="label-caps mb-3 tracking-widest text-accent">Huy động vốn IP mã hóa</p>
        <h1
          className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Đầu tư vào ý tưởng,<br />
          <span className="accent-text">trước khi thế giới nhận ra.</span>
        </h1>
        <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-text-secondary">
          Cam kết vốn vào các chiến dịch được bảo chứng bằng tài sản trí tuệ.
          Vốn được khóa bằng hợp đồng thông minh, kết quả nhị phân, hoàn toàn không lưu ký.
        </p>

        <div className="mt-8 flex items-center gap-6">
          <div>
            <p
              className="text-2xl font-bold tabular-nums"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {campaigns.length}
            </p>
            <p className="text-xs text-text-muted">Chiến dịch</p>
          </div>
          <div className="h-6 w-px bg-border" />
          <div>
            <p
              className="text-2xl font-bold text-accent"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              100%
            </p>
            <p className="text-xs text-text-muted">On-chain</p>
          </div>
          <div className="h-6 w-px bg-border" />
          <div>
            <p
              className="text-2xl font-bold text-text-secondary"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Sepolia
            </p>
            <p className="text-xs text-text-muted">Mạng thử nghiệm</p>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-1.5 animate-slide-up stagger-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatus(f.value)}
            className={`rounded-md px-3 py-1.5 text-[0.8125rem] font-medium transition-all duration-150 ${
              status === f.value
                ? 'bg-accent/12 text-accent'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error ? (
        <ErrorMessage message={error} retry={fetchCampaigns} />
      ) : loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center animate-fade-in">
          <svg className="mb-3 h-8 w-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p className="text-sm font-medium text-text-secondary">Chưa có chiến dịch phù hợp</p>
          <p className="mt-1 text-xs text-text-muted">
            {status ? 'Thử một bộ lọc khác' : 'Quay lại sau để xem các đợt mở bán mới'}
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c, i) => (
            <CampaignCard key={c.onChainId} campaign={c} index={i} />
          ))}
        </div>
      )}

      <div className="mt-20 animate-slide-up">
        <p className="label-caps mb-6 tracking-widest">Cơ chế hoạt động</p>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { num: '01', title: 'Tạo chiến dịch', desc: 'Doanh nghiệp gửi chiến dịch IP với mục tiêu vốn, giá token và lịch gọi vốn rõ ràng.' },
            { num: '02', title: 'Góp vốn', desc: 'Nhà đầu tư cam kết ETH trong thời gian mở bán. Toàn bộ vốn được giữ trong escrow on-chain.' },
            { num: '03', title: 'Quyết toán', desc: 'Đạt mức tối thiểu thì phân phối token. Không đạt thì hoàn tiền đầy đủ. Kết quả rõ ràng, không mập mờ.' },
          ].map((step, i) => (
            <div
              key={step.num}
              className={`panel p-6 animate-slide-up stagger-${i + 1}`}
            >
              <span className="text-xs font-semibold text-accent tabular-nums">{step.num}</span>
              <h3
                className="mt-2 text-base font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
