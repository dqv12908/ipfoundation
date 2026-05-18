import {
  createPublicClient,
  defineChain,
  getAddress,
  http,
  isAddress,
  type Address,
} from 'viem'
import { campaignAbi, campaignFactoryAbi } from '@/lib/platform/generated'
import {
  DEFAULT_SEPOLIA_RPC_URL,
  PLATFORM_CHAIN_ID,
  getPlatformFactoryAddress,
} from '@/lib/platform/config'
import type { ApiCampaign, ApiCommitment } from '@/lib/platform/api'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as const
const HARDHAT_CHAIN_ID = 31337

const hardhatChain = defineChain({
  id: HARDHAT_CHAIN_ID,
  name: 'Hardhat',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
})

const sepoliaChain = defineChain({
  id: 11155111,
  name: 'Sepolia',
  nativeCurrency: { decimals: 18, name: 'Sepolia Ether', symbol: 'ETH' },
  rpcUrls: {
    default: { http: [DEFAULT_SEPOLIA_RPC_URL] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
})

const STATUS_LABELS = [
  'CREATED',
  'APPROVED',
  'REJECTED',
  'LIVE',
  'ENDED',
  'FINALIZED',
] as const

function getTransportUrl() {
  if (PLATFORM_CHAIN_ID === HARDHAT_CHAIN_ID) {
    return process.env.RPC_URL ?? 'http://127.0.0.1:8545'
  }

  return (
    process.env.RPC_URL ??
    process.env.SEPOLIA_RPC_URL ??
    process.env.NEXT_PUBLIC_RPC_URL ??
    DEFAULT_SEPOLIA_RPC_URL
  )
}

const publicClient = createPublicClient({
  chain: PLATFORM_CHAIN_ID === HARDHAT_CHAIN_ID ? hardhatChain : sepoliaChain,
  transport: http(getTransportUrl()),
})

function mapStatus(status: number, finalized: boolean, successful: boolean) {
  if (status === 5 || finalized) {
    return successful ? 'FINALIZED_SUCCESS' : 'FINALIZED_FAIL'
  }

  return STATUS_LABELS[status] ?? 'CREATED'
}

function toIsoDate(timestamp: bigint) {
  return new Date(Number(timestamp) * 1000).toISOString()
}

function toNullAddress(address: Address) {
  return address.toLowerCase() === ZERO_ADDRESS ? null : getAddress(address)
}

function parsePositiveInt(value: string | null, fallback: number) {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

export function getPagination(searchParams: URLSearchParams) {
  const page = parsePositiveInt(searchParams.get('page'), 1)
  const limit = Math.min(parsePositiveInt(searchParams.get('limit'), 20), 100)
  return { page, limit }
}

export function paginate<T>(items: T[], page: number, limit: number) {
  const total = items.length
  const pages = total === 0 ? 0 : Math.ceil(total / limit)
  const start = (page - 1) * limit

  return {
    items: items.slice(start, start + limit),
    pagination: { page, limit, total, pages },
  }
}

export async function fetchCampaignAddress(onChainId: number) {
  return publicClient.readContract({
    address: getPlatformFactoryAddress(),
    abi: campaignFactoryAbi,
    functionName: 'getCampaign',
    args: [BigInt(onChainId)],
  })
}

export async function fetchCampaign(onChainId: number): Promise<ApiCampaign> {
  const contractAddress = await fetchCampaignAddress(onChainId)

  const [
    name,
    symbol,
    metadataURI,
    minRaise,
    maxRaise,
    tokenPrice,
    startTime,
    endTime,
    acceptedAsset,
    status,
    totalCommitted,
    finalized,
    successful,
    token,
    company,
  ] = await Promise.all([
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'name',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'symbol',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'metadataURI',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'minRaise',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'maxRaise',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'tokenPrice',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'startTime',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'endTime',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'acceptedAsset',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'getStatus',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'totalCommitted',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'finalized',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'successful',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'token',
    }),
    publicClient.readContract({
      address: contractAddress,
      abi: campaignAbi,
      functionName: 'company',
    }),
  ])

  return {
    id: onChainId,
    onChainId,
    contractAddress: getAddress(contractAddress),
    company: getAddress(company),
    name,
    symbol,
    metadataURI: metadataURI || null,
    description: null,
    minRaise: minRaise.toString(),
    maxRaise: maxRaise.toString(),
    tokenPrice: tokenPrice.toString(),
    startTime: toIsoDate(startTime),
    endTime: toIsoDate(endTime),
    acceptedAsset: getAddress(acceptedAsset),
    status: mapStatus(Number(status), finalized, successful),
    totalCommitted: totalCommitted.toString(),
    finalized,
    successful: finalized ? successful : null,
    tokenAddress: toNullAddress(token),
    _count: { commitments: 0 },
  }
}

export async function fetchCampaigns(params?: {
  status?: string | null
  page?: number
  limit?: number
}) {
  const count = await publicClient.readContract({
    address: getPlatformFactoryAddress(),
    abi: campaignFactoryAbi,
    functionName: 'campaignCount',
  })

  const campaigns = await Promise.all(
    Array.from({ length: Number(count) }, (_, onChainId) =>
      fetchCampaign(onChainId),
    ),
  )

  const filtered = params?.status
    ? campaigns.filter((campaign) => campaign.status === params.status)
    : campaigns

  const sorted = filtered.sort((a, b) => b.onChainId - a.onChainId)
  return paginate(sorted, params?.page ?? 1, params?.limit ?? 20)
}

export async function fetchInvestorParticipations(
  investor: string,
): Promise<ApiCommitment[]> {
  if (!isAddress(investor)) return []

  const normalizedInvestor = getAddress(investor)
  const { items: campaigns } = await fetchCampaigns({ page: 1, limit: 100 })

  const participations = await Promise.all(
    campaigns.map(async (campaign): Promise<ApiCommitment | null> => {
      const campaignAddress = campaign.contractAddress as Address
      const [amount, claimed, refunded] = await Promise.all([
        publicClient.readContract({
          address: campaignAddress,
          abi: campaignAbi,
          functionName: 'commitments',
          args: [normalizedInvestor],
        }),
        publicClient.readContract({
          address: campaignAddress,
          abi: campaignAbi,
          functionName: 'tokensClaimed',
          args: [normalizedInvestor],
        }),
        publicClient.readContract({
          address: campaignAddress,
          abi: campaignAbi,
          functionName: 'refundClaimed',
          args: [normalizedInvestor],
        }),
      ])

      if (amount === 0n) return null

      return {
        id: campaign.onChainId,
        campaignId: campaign.onChainId,
        investor: normalizedInvestor,
        amount: amount.toString(),
        blockNumber: 0,
        txHash: '',
        claimed,
        refunded,
        createdAt: campaign.startTime,
        campaign,
      }
    }),
  )

  return participations.filter((item): item is ApiCommitment => item !== null)
}
