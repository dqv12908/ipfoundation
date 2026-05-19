'use client'

import { useReadContract, useWriteContract } from 'wagmi'
import { campaignAbi } from '@/lib/platform/generated'
import { formatRaise, formatTokens } from '@/lib/platform/format'
import { TransactionButton } from '@/components/platform/shared/TransactionButton'

export function AllocationDisplay({
  campaignAddress,
  investor,
  finalized,
  successful,
}: {
  campaignAddress: `0x${string}`
  investor: `0x${string}`
  finalized: boolean
  successful: boolean | null
}) {
  const { data: allocation } = useReadContract({
    address: campaignAddress,
    abi: campaignAbi,
    functionName: 'getAllocation',
    args: [investor],
  })

  const { data: commitment } = useReadContract({
    address: campaignAddress,
    abi: campaignAbi,
    functionName: 'commitments',
    args: [investor],
  })

  const { data: tokensClaimed } = useReadContract({
    address: campaignAddress,
    abi: campaignAbi,
    functionName: 'tokensClaimed',
    args: [investor],
  })

  const { data: refundClaimed } = useReadContract({
    address: campaignAddress,
    abi: campaignAbi,
    functionName: 'refundClaimed',
    args: [investor],
  })

  const {
    data: claimTokensHash,
    isPending: claimTokensPending,
    writeContract: writeClaimTokens,
  } = useWriteContract()

  const {
    data: claimRefundHash,
    isPending: claimRefundPending,
    writeContract: writeClaimRefund,
  } = useWriteContract()

  if (!commitment || commitment === 0n) return null

  const [accepted, tokens, refund] = allocation ?? [0n, 0n, 0n]

  return (
    <div className="panel p-5 animate-slide-up">
      <p className="label-caps mb-3">Phân bổ của bạn</p>

      <dl className="space-y-2.5 text-sm">
        {[
          { label: 'Đã cam kết', value: formatRaise(commitment.toString()), color: '' },
          { label: 'Được nhận', value: formatRaise(accepted.toString()), color: 'text-positive' },
          { label: 'Token', value: `${formatTokens(tokens.toString())} token`, color: 'text-accent' },
        ].map((item) => (
          <div key={item.label} className="flex justify-between">
            <dt className="text-text-muted">{item.label}</dt>
            <dd className={`font-semibold tabular-nums ${item.color}`}>{item.value}</dd>
          </div>
        ))}
        {refund > 0n && (
          <div className="flex justify-between">
            <dt className="text-text-muted">Hoàn tiền</dt>
            <dd className="font-semibold tabular-nums text-caution">{formatRaise(refund.toString())}</dd>
          </div>
        )}
      </dl>

      {finalized && (
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          {successful && tokens > 0n && !tokensClaimed && (
            <TransactionButton
              hash={claimTokensHash}
              isPending={claimTokensPending}
              onClick={() =>
                writeClaimTokens({
                  address: campaignAddress,
                  abi: campaignAbi,
                  functionName: 'claimTokens',
                })
              }
            >
              Nhận token
            </TransactionButton>
          )}
          {tokensClaimed && (
            <div className="flex items-center gap-1.5 text-sm text-positive">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Đã nhận token
            </div>
          )}

          {refund > 0n && !refundClaimed && (
            <TransactionButton
              hash={claimRefundHash}
              isPending={claimRefundPending}
              onClick={() =>
                writeClaimRefund({
                  address: campaignAddress,
                  abi: campaignAbi,
                  functionName: 'claimRefund',
                })
              }
            >
              Nhận hoàn tiền ({formatRaise(refund.toString())})
            </TransactionButton>
          )}
          {refundClaimed && (
            <div className="flex items-center gap-1.5 text-sm text-positive">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Đã nhận hoàn tiền
            </div>
          )}
        </div>
      )}

      {!finalized && (
        <p className="mt-3 text-[0.6875rem] text-text-muted">
          Đây là phân bổ ước tính. Giá trị cuối cùng được xác nhận sau khi chiến dịch quyết toán.
        </p>
      )}
    </div>
  )
}
