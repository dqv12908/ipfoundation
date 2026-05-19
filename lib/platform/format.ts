import { formatEther } from 'viem'

export function formatRaise(wei: string): string {
  const eth = formatEther(BigInt(wei))
  return `${Number(eth).toLocaleString('vi-VN', { maximumFractionDigits: 2 })} ETH`
}

export function formatTokens(wei: string): string {
  const val = Number(formatEther(BigInt(wei)))
  return val.toLocaleString('vi-VN', { maximumFractionDigits: 2 })
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function shortAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export function campaignProgress(totalCommitted: string, maxRaise: string): number {
  const committed = Number(totalCommitted)
  const max = Number(maxRaise)
  if (max === 0) return 0
  return Math.min((committed / max) * 100, 100)
}
