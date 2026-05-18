const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 10 } })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: { page: number; limit: number; total: number; pages: number }
}

export interface ApiCampaign {
  id: number
  onChainId: number
  contractAddress: string
  company: string
  name: string
  symbol: string
  metadataURI: string | null
  description: string | null
  minRaise: string
  maxRaise: string
  tokenPrice: string
  startTime: string
  endTime: string
  acceptedAsset: string
  status: string
  totalCommitted: string
  finalized: boolean
  successful: boolean | null
  tokenAddress: string | null
  _count?: { commitments: number }
}

export interface ApiCommitment {
  id: number
  campaignId: number
  investor: string
  amount: string
  blockNumber: number
  txHash: string
  claimed: boolean
  refunded: boolean
  createdAt: string
  campaign?: Partial<ApiCampaign>
}

export interface ApiPost {
  id: number
  campaignId: number
  company: string
  content: string
  createdAt: string
  companyName?: string | null
  campaign?: {
    id: number
    onChainId: number
    name: string
    symbol: string
    company: string
    imageUrl: string | null
    status: string
  }
}

export interface ApiFollow {
  id: number
  follower: string
  company: string
  createdAt: string
}

export async function postApi<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `API error: ${res.status}` }))
    throw new Error(err.error ?? `API error: ${res.status}`)
  }
  return res.json()
}

export interface ApiCompanyAccount {
  id: number
  companyId: string
  name: string
  walletAddress: string
}

export async function authPostApi<T>(path: string, body: unknown, token: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `API error: ${res.status}` }))
    throw new Error(err.error ?? `API error: ${res.status}`)
  }
  return res.json()
}

export async function deleteApi<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}
