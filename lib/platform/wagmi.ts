import { getDefaultConfig } from 'connectkit'
import { createConfig, http } from 'wagmi'
import { sepolia, hardhat } from 'wagmi/chains'
import { DEFAULT_SEPOLIA_RPC_URL } from '@/lib/platform/config'

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 11155111)
const isLocal = chainId === 31337

export const config = createConfig(
  getDefaultConfig({
    chains: isLocal ? [hardhat] : [sepolia],
    transports: isLocal
      ? { [hardhat.id]: http('http://localhost:8545') }
      : {
          [sepolia.id]: http(
            process.env.NEXT_PUBLIC_RPC_URL ?? DEFAULT_SEPOLIA_RPC_URL,
          ),
        },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '',
    appName: 'IP Foundation Launchpad',
    appDescription: 'Tokenized IP fundraising by IP Foundation',
    appIcon: '/images/icon.ico',
  }),
)
