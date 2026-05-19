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
            '--ck-overlay-background': 'rgba(0, 0, 0, 0.88)',
            '--ck-overlay-backdrop-filter': 'blur(8px)',
            '--ck-modal-box-shadow': '0 24px 48px rgba(0, 0, 0, 0.5)',
            '--ck-body-background': '#0A0A0A',
            '--ck-body-color': '#FFFFFF',
            '--ck-body-color-muted': '#A1A1AA',
            '--ck-primary-button-background': '#2563EB',
            '--ck-primary-button-color': '#FFFFFF',
            '--ck-primary-button-border-radius': '8px',
            '--ck-secondary-button-background': 'rgba(255, 255, 255, 0.04)',
            '--ck-secondary-button-color': '#FFFFFF',
            '--ck-secondary-button-border-radius': '8px',
            '--ck-connectbutton-background': '#2563EB',
            '--ck-connectbutton-color': '#FFFFFF',
            '--ck-connectbutton-border-radius': '8px',
            '--ck-connectbutton-hover-background': '#FFFFFF',
            '--ck-connectbutton-hover-color': '#2563EB',
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
