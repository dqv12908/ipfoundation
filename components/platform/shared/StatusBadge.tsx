const statusConfig: Record<string, { label: string; color: string; dotColor: string; pulse?: boolean }> = {
  CREATED: { label: 'Chờ duyệt', color: 'text-caution bg-caution/8 border-caution/15', dotColor: 'bg-caution' },
  APPROVED: { label: 'Sắp mở', color: 'text-info bg-info/8 border-info/15', dotColor: 'bg-info' },
  REJECTED: { label: 'Từ chối', color: 'text-negative bg-negative/8 border-negative/15', dotColor: 'bg-negative' },
  LIVE: { label: 'Đang gọi vốn', color: 'text-positive bg-positive/8 border-positive/15', dotColor: 'bg-positive', pulse: true },
  ENDED: { label: 'Đã kết thúc', color: 'text-text-muted bg-white/[0.03] border-white/[0.06]', dotColor: 'bg-text-muted' },
  FINALIZED_SUCCESS: { label: 'Thành công', color: 'text-positive bg-positive/8 border-positive/15', dotColor: 'bg-positive' },
  FINALIZED_FAIL: { label: 'Thất bại', color: 'text-negative bg-negative/8 border-negative/15', dotColor: 'bg-negative' },
}

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? {
    label: status,
    color: 'text-text-muted bg-white/[0.03] border-white/[0.06]',
    dotColor: 'bg-text-muted',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide ${config.color}`}>
      <span className="relative flex h-1.5 w-1.5">
        {config.pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${config.dotColor}`}
            style={{ animation: 'pulse-ring 1.5s ease-out infinite' }}
          />
        )}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${config.dotColor}`} />
      </span>
      {config.label}
    </span>
  )
}
