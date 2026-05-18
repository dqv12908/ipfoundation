'use client'

import { useState, useEffect, type ReactNode } from 'react'

const PASSWORDS: Record<string, string> = {
  admin: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'admin123',
  company: process.env.NEXT_PUBLIC_COMPANY_PASSWORD ?? 'company123',
}

export function PasswordGate({
  type,
  children,
}: {
  type: 'admin' | 'company'
  children: ReactNode
}) {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const storageKey = `ipplatform_${type}_auth`

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(storageKey)
      if (stored === 'true') setAuthenticated(true)
    }
  }, [storageKey])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === PASSWORDS[type]) {
      sessionStorage.setItem(storageKey, 'true')
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (authenticated) return <>{children}</>

  const title = type === 'admin' ? 'Admin Access' : 'Company Portal'
  const subtitle = type === 'admin'
    ? 'Enter the admin password to continue'
    : 'Enter the company password to access your portal'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/95 backdrop-blur-sm">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="panel-elevated p-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
            <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          <h1
            className="mb-1 text-lg font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h1>
          <p className="mb-6 text-sm text-text-secondary">{subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                placeholder="Password"
                className={`input-dark text-center tracking-widest ${error ? 'border-negative/40' : ''}`}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-xs text-negative animate-fade-in">
                  Incorrect password
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full">
              Unlock
            </button>
          </form>

          <p className="mt-5 text-xs text-text-muted">
            Protected section. Contact platform admin for access.
          </p>
        </div>
      </div>
    </div>
  )
}
