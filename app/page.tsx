'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PublicPage from './public/page'

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if logged in by calling API
    fetch('/api/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          router.push('/admin')
        } else {
          setIsLoggedIn(false)
        }
      })
      .catch(() => setIsLoggedIn(false))
  }, [router])

  if (isLoggedIn === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return <PublicPage />
}
