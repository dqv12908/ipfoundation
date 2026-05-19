'use client'

import { useState } from 'react'
import { parseEther } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'
import { campaignAbi } from '@/lib/platform/generated'
import { TransactionButton } from '@/components/platform/shared/TransactionButton'

export function CommitPanel({
  campaignAddress,
  status,
  acceptedAsset,
}: {
  campaignAddress: `0x${string}`
  status: string
  acceptedAsset: string
}) {
  const { isConnected } = useAccount()
  const [amount, setAmount] = useState('')
  const { data: hash, isPending, writeContract } = useWriteContract()

  const isETH = acceptedAsset === '0x0000000000000000000000000000000000000000'
  const isLive = status === 'LIVE'

  function handleCommit() {
    if (!amount || !isLive) return
    if (isETH) {
      writeContract({
        address: campaignAddress,
        abi: campaignAbi,
        functionName: 'commitETH',
        value: parseEther(amount),
      })
    } else {
      writeContract({
        address: campaignAddress,
        abi: campaignAbi,
        functionName: 'commit',
        args: [parseEther(amount)],
      })
    }
  }

  if (!isConnected) {
    return (
      <div className="panel p-5 text-center">
        <svg className="mx-auto mb-2 h-6 w-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
        </svg>
        <p className="text-sm text-text-secondary">Connect wallet to participate</p>
      </div>
    )
  }

  if (!isLive) {
    return (
      <div className="panel p-5 text-center">
        <svg className="mx-auto mb-2 h-6 w-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <p className="text-sm text-text-secondary">
          {status === 'APPROVED' ? 'Campaign has not started yet' : 'Not accepting commitments'}
        </p>
      </div>
    )
  }

  return (
    <div className="panel p-5" style={{ borderColor: 'rgba(37,99,235,0.18)' }}>
      <p className="label-caps mb-3">Commit Funds</p>
      <div className="mb-4">
        <label className="mb-1.5 block text-xs text-text-secondary">
          Amount ({isETH ? 'ETH' : 'Token'})
        </label>
        <div className="relative">
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-dark pr-14 text-lg font-semibold tabular-nums"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-text-muted">
            {isETH ? 'ETH' : 'TKN'}
          </span>
        </div>
      </div>
      <TransactionButton
        hash={hash}
        isPending={isPending}
        disabled={!amount || parseFloat(amount) <= 0}
        onClick={handleCommit}
        onSuccess={() => setAmount('')}
      >
        Commit {amount ? `${amount} ${isETH ? 'ETH' : 'Tokens'}` : 'Funds'}
      </TransactionButton>
    </div>
  )
}
