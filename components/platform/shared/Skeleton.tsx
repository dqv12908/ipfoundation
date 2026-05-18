export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`shimmer rounded-md ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface-card p-5">
      <div className="mb-4 flex justify-between">
        <div>
          <Skeleton className="mb-2 h-4 w-28" />
          <Skeleton className="h-3 w-14" />
        </div>
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <Skeleton className="h-11 rounded-lg" />
        <Skeleton className="h-11 rounded-lg" />
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
      <div className="mt-3 flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-card">
      <div className="border-b border-border px-5 py-3">
        <Skeleton className="h-3 w-full" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b border-white/[0.03] px-5 py-3">
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  )
}
