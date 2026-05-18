'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { ConnectKitProvider } from 'connectkit'
import { config } from './wagmi'
import { useState, type ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          mode="dark"
          customTheme={{
            '--ck-font-family': 'var(--font-body)',
            '--ck-border-radius': '8px',
            '--ck-overlay-background': 'rgba(6, 7, 10, 0.88)',
            '--ck-overlay-backdrop-filter': 'blur(8px)',
            '--ck-modal-box-shadow': '0 24px 48px rgba(0, 0, 0, 0.5)',
            '--ck-body-background': '#0C0D12',
            '--ck-body-color': '#EEEEF0',
            '--ck-body-color-muted': '#71757E',
            '--ck-primary-button-background': '#C9A84C',
            '--ck-primary-button-color': '#06070A',
            '--ck-primary-button-border-radius': '8px',
            '--ck-secondary-button-background': 'rgba(255, 255, 255, 0.04)',
            '--ck-secondary-button-color': '#EEEEF0',
            '--ck-secondary-button-border-radius': '8px',
            '--ck-connectbutton-background': '#C9A84C',
            '--ck-connectbutton-color': '#06070A',
            '--ck-connectbutton-border-radius': '8px',
            '--ck-connectbutton-hover-background': '#D4B35C',
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
