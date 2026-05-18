export const ETH_ADDRESS = '0x0000000000000000000000000000000000000000' as const

export const CAMPAIGN_ADMIN_ROLE =
  '0x68e79a7bf1e0bc45d0a330c573bc367f9cf464fd326078812f301165fbda4ef1' as const

export const SUPPORTED_CHAIN_IDS = {
  mainnet: 1,
  sepolia: 11155111,
  localhost: 31337,
} as const

export type SupportedChainId = (typeof SUPPORTED_CHAIN_IDS)[keyof typeof SUPPORTED_CHAIN_IDS]
