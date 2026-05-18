import { getDefaultConfig } from 'connectkit'
import { createConfig, http } from 'wagmi'
import { sepolia, hardhat } from 'wagmi/chains'

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 11155111)
const isLocal = chainId === 31337

export const config = createConfig(
  getDefaultConfig({
    chains: isLocal ? [hardhat] : [sepolia],
    transports: isLocal
      ? { [hardhat.id]: http('http://localhost:8545') }
      : { [sepolia.id]: http() },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '',
    appName: 'IP Platform',
    appDescription: 'IP Tokenization Launchpad on Ethereum',
  }),
)
