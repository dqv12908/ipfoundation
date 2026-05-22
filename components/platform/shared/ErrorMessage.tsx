export function ErrorMessage({
  title = 'Something went wrong',
  message,
  retry,
}: {
  title?: string
  message?: string
  retry?: () => void
}) {
  return (
    <div className="rounded-xl border border-negative/15 bg-negative/5 p-6 text-center animate-slide-up">
      <p className="text-sm font-semibold text-negative">{title}</p>
      {message && <p className="mt-1 text-sm text-negative/60">{message}</p>}
      {retry && (
        <button onClick={retry} className="btn-secondary mt-4 text-sm">
          Try Again
        </button>
      )}
    </div>
  )
}
