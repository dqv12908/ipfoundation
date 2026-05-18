'use client'

import { ConnectKitButton } from 'connectkit'

export function ConnectWalletPrompt({ message = 'Connect your wallet to continue' }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-surface-card py-14 text-center animate-fade-in">
      <svg className="h-8 w-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 013 6v3" />
      </svg>
      <p className="text-sm text-text-secondary">{message}</p>
      <ConnectKitButton />
    </div>
  )
}
