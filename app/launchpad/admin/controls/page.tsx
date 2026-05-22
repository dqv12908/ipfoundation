'use client'

import { useReadContract, useWriteContract } from 'wagmi'
import { campaignFactoryAbi } from '@/lib/platform/generated'
import { TransactionButton } from '@/components/platform/shared/TransactionButton'

const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}` | undefined

export default function AdminControlsPage() {
  const { data: paused } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: campaignFactoryAbi,
    functionName: 'paused',
    query: { enabled: !!FACTORY_ADDRESS },
  })

  const { data: pauseHash, isPending: pausePending, writeContract: writePause } = useWriteContract()
  const { data: unpauseHash, isPending: unpausePending, writeContract: writeUnpause } = useWriteContract()

  if (!FACTORY_ADDRESS) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-2 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Emergency Controls</h1>
        <p className="text-sm text-text-muted">Factory address not configured.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl animate-fade-in">
      <h1 className="mb-8 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Emergency Controls
      </h1>

      <div className="panel p-5">
        <div className="mb-6 text-center">
          <p className="label-caps mb-2">Platform Status</p>
          <div className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-bold ${
            paused ? 'bg-negative/10 text-negative' : 'bg-positive/10 text-positive'
          }`}>
            {paused === undefined ? '—' : paused ? 'Paused' : 'Active'}
          </div>
        </div>

        {paused === false && (
          <div>
            <p className="mb-4 rounded-lg bg-negative/5 border border-negative/10 p-3 text-xs text-text-secondary leading-relaxed">
              Pausing will prevent all new commitments, claims, and finalization across all campaigns.
            </p>
            <TransactionButton
              hash={pauseHash}
              isPending={pausePending}
              variant="danger"
              onClick={() =>
                writePause({
                  address: FACTORY_ADDRESS,
                  abi: campaignFactoryAbi,
                  functionName: 'pause',
                })
              }
            >
              Pause Platform
            </TransactionButton>
          </div>
        )}

        {paused === true && (
          <div>
            <p className="mb-4 text-sm text-text-secondary">
              The platform is currently paused. Unpause to resume normal operations.
            </p>
            <TransactionButton
              hash={unpauseHash}
              isPending={unpausePending}
              onClick={() =>
                writeUnpause({
                  address: FACTORY_ADDRESS,
                  abi: campaignFactoryAbi,
                  functionName: 'unpause',
                })
              }
            >
              Unpause Platform
            </TransactionButton>
          </div>
        )}
      </div>
    </div>
  )
}
