import { notFound } from 'next/navigation'
import { useSettings } from '@/lib/hooks/useSettings' // eslint-disable-line @typescript-eslint/no-unused-vars

interface PageProps {
  params: {
    slug: string
  }
}

export default function CustomPage({ params }: PageProps) {
  // Note: This is a server component, but useSettings is client-side
  // For now, we'll use a simple approach, but ideally move to client component
  const settings = {
    customPages: [
      {
        id: 1,
        title: 'About Us',
        slug: 'about',
        content: 'Welcome to our mini app! Learn more about our mission and vision.',
        published: true
      },
      {
        id: 2,
        title: 'Help & Support',
        slug: 'help',
        content: 'Need help? Check out our FAQ and contact information.',
        published: false
      }
    ]
  }

  const page = settings.customPages.find(p => p.slug === params.slug && p.published)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{page.title}</h1>
          <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
        </header>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  // In a real app, fetch from database
  const settings = {
    customPages: [
      { slug: 'about' },
      { slug: 'help' }
    ]
  }

  return settings.customPages.map((page) => ({
    slug: page.slug,
  }))
}