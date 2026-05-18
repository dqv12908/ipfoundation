'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CampaignsRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/app') }, [router])
  return null
}
