'use client'

import Link from 'next/link'
import { shortAddress } from '@/lib/platform/format'
import { StatusBadge } from '@/components/platform/shared/StatusBadge'
import { FollowButton } from './FollowButton'
import type { ApiPost } from '@/lib/platform/api'

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const seconds = Math.floor((now - then) / 1000)

  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

interface PostCardProps {
  post: ApiPost
  follower?: string
  isFollowing: boolean
  onFollowToggle: (company: string, following: boolean) => void
}

export function PostCard({ post, follower, isFollowing, onFollowToggle }: PostCardProps) {
  return (
    <div className="panel p-5 transition-colors hover:bg-white/[0.015]">
      {/* Header: campaign info + follow */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <Link
          href={`/app/campaigns/${post.campaign?.onChainId}`}
          className="group min-w-0 flex-1"
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-xs font-bold text-accent">
              {post.campaign?.symbol?.slice(0, 3) ?? '?'}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="truncate text-sm font-bold group-hover:text-accent transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {post.campaign?.name ?? 'Unknown'}
                </span>
                {post.campaign?.status && (
                  <StatusBadge status={post.campaign.status} />
                )}
              </div>
              <p className="text-xs text-text-muted">
                {post.companyName ?? shortAddress(post.company)} · {timeAgo(post.createdAt)}
              </p>
            </div>
          </div>
        </Link>
        {follower && follower.toLowerCase() !== post.company.toLowerCase() && (
          <FollowButton
            company={post.company}
            follower={follower}
            isFollowing={isFollowing}
            onToggle={onFollowToggle}
          />
        )}
      </div>

      {/* Content */}
      <div className="pl-[52px]">
        <p className="whitespace-pre-wrap text-[0.875rem] leading-relaxed text-text-primary">
          {post.content}
        </p>
      </div>
    </div>
  )
}
