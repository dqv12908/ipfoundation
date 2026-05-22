'use client'

import { useWaitForTransactionReceipt } from 'wagmi'
import { type ReactNode, useEffect } from 'react'

interface TransactionButtonProps {
  hash: `0x${string}` | undefined
  isPending: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
  onSuccess?: () => void
  variant?: 'primary' | 'danger'
}

export function TransactionButton({
  hash,
  isPending,
  disabled,
  onClick,
  children,
  onSuccess,
  variant = 'primary',
}: TransactionButtonProps) {
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isSuccess && onSuccess) onSuccess()
  }, [isSuccess, onSuccess])

  const loading = isPending || isConfirming
  const cls = variant === 'danger' ? 'btn-danger' : 'btn-primary'

  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`${cls} relative w-full`}
      >
        {loading && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <span
              className="inline-block h-3.5 w-3.5 rounded-full border-2 border-current/30 border-t-current"
              style={{ animation: 'spin 0.7s linear infinite' }}
            />
          </span>
        )}
        {isPending ? 'Confirm in wallet...' : isConfirming ? 'Confirming...' : children}
      </button>
      {isSuccess && (
        <div className="mt-2 flex items-center gap-1.5 text-sm text-positive animate-fade-in">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Transaction confirmed
        </div>
      )}
    </div>
  )
}
