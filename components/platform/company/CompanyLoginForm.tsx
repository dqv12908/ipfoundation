'use client'

import { useState } from 'react'
import { useCompanyAuth } from '@/lib/platform/company-auth'

export function CompanyLoginForm() {
  const { login } = useCompanyAuth()
  const [companyId, setCompanyId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(companyId, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/95 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="panel-elevated p-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
            <svg
              className="h-6 w-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
          </div>

          <h1
            className="mb-1 text-lg font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Company Portal
          </h1>
          <p className="mb-6 text-sm text-text-secondary">
            Sign in with your company credentials
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={companyId}
              onChange={(e) => {
                setCompanyId(e.target.value)
                setError('')
              }}
              placeholder="Company ID"
              className="input-dark w-full"
              autoFocus
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Password"
              className="input-dark w-full"
            />
            {error && (
              <p className="text-xs text-negative animate-fade-in">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !companyId || !password}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-5 text-xs text-text-muted">
            Contact the platform admin to get your company credentials.
          </p>
        </div>
      </div>
    </div>
  )
}
