'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { ApiCompanyAccount } from './api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

interface CompanyAuthState {
  company: ApiCompanyAccount | null
  token: string | null
  loading: boolean
  login: (companyId: string, password: string) => Promise<void>
  logout: () => void
}

const CompanyAuthContext = createContext<CompanyAuthState>({
  company: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
})

export function useCompanyAuth() {
  return useContext(CompanyAuthContext)
}

export function CompanyAuthProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<ApiCompanyAccount | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Restore session on mount
  useEffect(() => {
    const stored = localStorage.getItem('ipplatform_company_token')
    if (!stored) {
      setLoading(false)
      return
    }
    fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${stored}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error('Invalid token')
        return r.json()
      })
      .then((data: ApiCompanyAccount) => {
        setToken(stored)
        setCompany(data)
      })
      .catch(() => {
        localStorage.removeItem('ipplatform_company_token')
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (companyId: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyId, password }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Login failed' }))
      throw new Error(err.error ?? 'Login failed')
    }
    const data = await res.json()
    localStorage.setItem('ipplatform_company_token', data.token)
    setToken(data.token)
    setCompany(data.company)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ipplatform_company_token')
    setToken(null)
    setCompany(null)
  }, [])

  return (
    <CompanyAuthContext.Provider value={{ company, token, loading, login, logout }}>
      {children}
    </CompanyAuthContext.Provider>
  )
}
