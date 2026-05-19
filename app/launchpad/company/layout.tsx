'use client'

import { CompanyAuthProvider, useCompanyAuth } from '@/lib/platform/company-auth'
import { CompanyLoginForm } from '@/components/platform/company/CompanyLoginForm'
import type { ReactNode } from 'react'

function CompanyGate({ children }: { children: ReactNode }) {
  const { company, loading } = useCompanyAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div
          className="h-6 w-6 rounded-full border-2 border-accent/20 border-t-accent"
          style={{ animation: 'spin 0.7s linear infinite' }}
        />
      </div>
    )
  }

  if (!company) {
    return <CompanyLoginForm />
  }

  return <>{children}</>
}

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <CompanyAuthProvider>
      <CompanyGate>{children}</CompanyGate>
    </CompanyAuthProvider>
  )
}
