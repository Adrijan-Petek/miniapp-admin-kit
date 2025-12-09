import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MiniApp Admin Kit',
  description: 'Admin dashboard starter kit for mini apps and GameFi projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
