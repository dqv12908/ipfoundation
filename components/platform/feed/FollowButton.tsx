'use client'

import { useState } from 'react'
import { postApi, deleteApi } from '@/lib/platform/api'

interface FollowButtonProps {
  company: string
  follower: string
  isFollowing: boolean
  onToggle: (company: string, following: boolean) => void
}

export function FollowButton({ company, follower, isFollowing, onToggle }: FollowButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    try {
      if (isFollowing) {
        await deleteApi('/api/follows', { follower, company })
        onToggle(company, false)
      } else {
        await postApi('/api/follows', { follower, company })
        onToggle(company, true)
      }
    } catch (err) {
      console.error('Follow toggle failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`rounded-lg px-3 py-1 text-xs font-medium transition-all duration-150 ${
        isFollowing
          ? 'bg-white/[0.06] text-text-secondary hover:bg-negative/10 hover:text-negative'
          : 'bg-accent/10 text-accent hover:bg-accent/20'
      } disabled:opacity-50`}
    >
      {loading ? (
        <span className="inline-block h-3 w-3 rounded-full border border-current border-t-transparent" style={{ animation: 'spin 0.7s linear infinite' }} />
      ) : isFollowing ? (
        'Following'
      ) : (
        'Follow'
      )}
    </button>
  )
}
