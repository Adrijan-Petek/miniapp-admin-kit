'use client'

import HomePage from './components/HomePage'
import { ThemeProvider } from '@/lib/hooks/useTheme'

export default function Page() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  )
}
