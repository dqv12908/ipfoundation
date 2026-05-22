'use client'

import { useState, useEffect, useCallback } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

interface CompanyAccount {
  id: number
  companyId: string
  name: string
  walletAddress: string
  createdAt: string
}

export default function AdminCompaniesPage() {
  const [accounts, setAccounts] = useState<CompanyAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    companyId: '',
    name: '',
    password: '',
    walletAddress: '',
  })
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Get admin password from sessionStorage (set by PasswordGate)
  function getAdminPassword(): string {
    if (typeof window === 'undefined') return ''
    return sessionStorage.getItem('ipplatform_admin_password') ?? ''
  }

  const fetchAccounts = useCallback(() => {
    fetch(`${API_URL}/api/auth/companies`, {
      headers: { 'X-Admin-Password': getAdminPassword() },
    })
      .then((r) => r.json())
      .then((data) => setAccounts(data.items ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(`${API_URL}/api/auth/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': getAdminPassword(),
        },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Failed' }))
        throw new Error(err.error)
      }
      setForm({ companyId: '', name: '', password: '', walletAddress: '' })
      setSuccess('Company account created successfully')
      fetchAccounts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create')
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this company account?')) return
    await fetch(`${API_URL}/api/auth/companies/${id}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Password': getAdminPassword() },
    })
    fetchAccounts()
  }

  return (
    <div className="animate-fade-in">
      <h1
        className="mb-8 text-xl font-bold"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Company Accounts
      </h1>

      {/* Create form */}
      <div className="panel mb-8 p-6">
        <h2
          className="mb-4 text-sm font-bold"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Create New Company Account
        </h2>
        <form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-text-secondary">
              Company ID
            </label>
            <input
              type="text"
              placeholder="e.g. nexus-protocol"
              value={form.companyId}
              onChange={(e) =>
                setForm((f) => ({ ...f, companyId: e.target.value }))
              }
              className="input-dark"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-secondary">
              Display Name
            </label>
            <input
              type="text"
              placeholder="e.g. Nexus Protocol"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
              className="input-dark"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-secondary">
              Password
            </label>
            <input
              type="text"
              placeholder="Initial password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              className="input-dark"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-secondary">
              Wallet Address
            </label>
            <input
              type="text"
              placeholder="0x..."
              value={form.walletAddress}
              onChange={(e) =>
                setForm((f) => ({ ...f, walletAddress: e.target.value }))
              }
              className="input-dark font-mono text-xs"
              required
            />
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={creating}
              className="btn-primary text-sm disabled:opacity-50"
            >
              {creating ? 'Creating...' : 'Create Account'}
            </button>
            {error && <p className="text-xs text-negative">{error}</p>}
            {success && <p className="text-xs text-positive">{success}</p>}
          </div>
        </form>
      </div>

      {/* Accounts list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div
            className="h-6 w-6 rounded-full border-2 border-accent/20 border-t-accent"
            style={{ animation: 'spin 0.7s linear infinite' }}
          />
        </div>
      ) : accounts.length === 0 ? (
        <div className="panel py-10 text-center">
          <p className="text-sm text-text-muted">No company accounts yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {accounts.map((a) => (
            <div
              key={a.id}
              className="panel flex items-center justify-between p-4"
            >
              <div>
                <p className="text-sm font-semibold">{a.name}</p>
                <p className="text-xs text-text-muted">
                  ID: <span className="text-accent">{a.companyId}</span> ·
                  Wallet:{' '}
                  <span className="font-mono">
                    {a.walletAddress.slice(0, 6)}...{a.walletAddress.slice(-4)}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-xs text-negative/60 transition-colors hover:text-negative"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
