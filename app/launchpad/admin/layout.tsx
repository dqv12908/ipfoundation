'use client'

import { PasswordGate } from '@/components/platform/ui/PasswordGate'
import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <PasswordGate type="admin">{children}</PasswordGate>
}
