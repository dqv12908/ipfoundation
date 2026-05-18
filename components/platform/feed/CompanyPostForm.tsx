'use client'

import { useState } from 'react'
import { authPostApi, postApi } from '@/lib/platform/api'
import type { ApiPost } from '@/lib/platform/api'

interface CompanyPostFormProps {
  campaignId: number
  company: string
  token?: string | null
  onPosted: (post: ApiPost) => void
}

export function CompanyPostForm({ campaignId, company, token, onPosted }: CompanyPostFormProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    setError(null)
    try {
      const body = { campaignId, company, content: content.trim() }
      const post = token
        ? await authPostApi<ApiPost>('/api/posts', body, token)
        : await postApi<ApiPost>('/api/posts', body)
      setContent('')
      onPosted(post)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share an update with your investors..."
        rows={3}
        maxLength={1000}
        className="input-dark w-full resize-none text-sm"
      />
      {error && <p className="mt-2 text-xs text-negative">{error}</p>}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-text-muted">{content.length}/1000</span>
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="btn-primary text-sm disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Update'}
        </button>
      </div>
    </form>
  )
}
