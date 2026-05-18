export const DEFAULT_PLATFORM_CHAIN_ID = 11155111

export const DEFAULT_SEPOLIA_FACTORY_ADDRESS =
  '0x3e094bcdc1777f0a0067fe7ecf7752d48df978a6' as const

export const DEFAULT_SEPOLIA_RPC_URL =
  'https://ethereum-sepolia-rpc.publicnode.com' as const

export const DEFAULT_LOCAL_FACTORY_ADDRESS =
  '0x5FbDB2315678afecb367f032d93F642f64180aa3' as const

export const PLATFORM_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_CHAIN_ID ?? DEFAULT_PLATFORM_CHAIN_ID,
)

function isAddress(value: string | undefined): value is `0x${string}` {
  return /^0x[a-fA-F0-9]{40}$/.test(value ?? '')
}

export function getPlatformFactoryAddress(
  chainId = PLATFORM_CHAIN_ID,
): `0x${string}` {
  if (isAddress(process.env.NEXT_PUBLIC_FACTORY_ADDRESS)) {
    return process.env.NEXT_PUBLIC_FACTORY_ADDRESS
  }

  return chainId === 31337
    ? DEFAULT_LOCAL_FACTORY_ADDRESS
    : DEFAULT_SEPOLIA_FACTORY_ADDRESS
}

export const PLATFORM_FACTORY_ADDRESS = getPlatformFactoryAddress()
