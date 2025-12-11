'use client'

import { useEffect, useState } from 'react'
import PublicPage from './components/PublicPage'

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if logged in by calling API
    fetch('/api/me')
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.authenticated)
      })
      .catch(() => setIsLoggedIn(false))
  }, [])

  return <PublicPage isLoggedIn={isLoggedIn} />
}
