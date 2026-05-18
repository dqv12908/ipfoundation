'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { PostCard } from '@/components/platform/feed/PostCard'
import { ConnectWalletPrompt } from '@/components/platform/shared/ConnectWalletPrompt'
import { ErrorMessage } from '@/components/platform/shared/ErrorMessage'
import type { ApiPost, ApiFollow, PaginatedResponse } from '@/lib/platform/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

type Tab = 'global' | 'invested' | 'following'

const tabs: { value: Tab; label: string; icon: React.ReactNode; requiresWallet: boolean }[] = [
  {
    value: 'global',
    label: 'Global',
    requiresWallet: false,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.777.514-3.435 1.401-4.832" />
      </svg>
    ),
  },
  {
    value: 'invested',
    label: 'Invested',
    requiresWallet: true,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    value: 'following',
    label: 'Following',
    requiresWallet: true,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
]

export default function FeedPage() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<Tab>('global')
  const [posts, setPosts] = useState<ApiPost[]>([])
  const [followedCompanies, setFollowedCompanies] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load follows
  useEffect(() => {
    if (!address) {
      setFollowedCompanies(new Set())
      return
    }
    fetch(`${API_URL}/api/follows?follower=${address.toLowerCase()}`)
      .then((r) => r.json() as Promise<{ items: ApiFollow[] }>)
      .then((data) => {
        setFollowedCompanies(new Set(data.items.map((f) => f.company)))
      })
      .catch(() => {})
  }, [address])

  const fetchPosts = useCallback(() => {
    setLoading(true)
    setError(null)
    const params = new URLSearchParams({ tab: activeTab, limit: '50' })
    if (address) params.set('investor', address.toLowerCase())
    fetch(`${API_URL}/api/posts?${params}`)
      .then((r) => {
        if (!r.ok) throw new Error(`API returned ${r.status}`)
        return r.json() as Promise<PaginatedResponse<ApiPost>>
      })
      .then((data) => setPosts(data.items))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [activeTab, address])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  function handleFollowToggle(company: string, following: boolean) {
    setFollowedCompanies((prev) => {
      const next = new Set(prev)
      if (following) next.add(company)
      else next.delete(company)
      return next
    })
  }

  const needsWallet = tabs.find((t) => t.value === activeTab)?.requiresWallet && !isConnected

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8 pt-4">
        <p className="label-caps mb-3 tracking-widest text-accent">Community</p>
        <h1
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Feed
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Updates from IP campaigns — follow teams, track your investments.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-white/[0.03] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all duration-150 ${
              activeTab === tab.value
                ? 'bg-white/[0.08] text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {needsWallet ? (
        <ConnectWalletPrompt
          message={
            activeTab === 'invested'
              ? 'Connect your wallet to see updates from campaigns you invested in.'
              : 'Connect your wallet to see updates from companies you follow.'
          }
        />
      ) : error ? (
        <ErrorMessage message={error} retry={fetchPosts} />
      ) : loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="panel animate-pulse p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/[0.04]" />
                <div className="flex-1">
                  <div className="h-4 w-32 rounded bg-white/[0.04]" />
                  <div className="mt-1.5 h-3 w-20 rounded bg-white/[0.03]" />
                </div>
              </div>
              <div className="pl-[52px]">
                <div className="h-4 w-full rounded bg-white/[0.04]" />
                <div className="mt-2 h-4 w-2/3 rounded bg-white/[0.03]" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center animate-fade-in">
          <svg
            className="mb-3 h-8 w-8 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <p className="text-sm font-medium text-text-secondary">
            {activeTab === 'global'
              ? 'No updates yet'
              : activeTab === 'invested'
                ? 'No updates from your invested campaigns'
                : 'No updates from companies you follow'}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {activeTab === 'global'
              ? 'Check back soon — companies will post progress updates here.'
              : activeTab === 'invested'
                ? 'Invest in campaigns to see their updates here.'
                : 'Follow companies from the Global feed to see their updates here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              follower={address?.toLowerCase()}
              isFollowing={followedCompanies.has(post.company)}
              onFollowToggle={handleFollowToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
