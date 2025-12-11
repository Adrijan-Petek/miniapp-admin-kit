'use client'

import { useState } from 'react'
import { useSettings, CustomPage } from '@/lib/hooks/useSettings'

export default function PagesPage() {
  const { settings, updateSetting } = useSettings()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    published: false
  })

  const pages = settings.customPages

  const updatePages = (newPages: CustomPage[]) => {
    updateSetting('customPages', newPages)
  }

  const handleCreate = () => {
    if (formData.title && formData.slug) {
      const newPage: CustomPage = {
        id: Math.max(...pages.map(p => p.id), 0) + 1,
        ...formData
      }
      updatePages([...pages, newPage])
      setFormData({ title: '', slug: '', content: '', published: false })
      setShowCreateForm(false)
    }
  }

  const handleEdit = (page: CustomPage) => {
    setEditingId(page.id)
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      published: page.published
    })
  }

  const handleUpdate = () => {
    if (editingId !== null) {
      updatePages(pages.map(p =>
        p.id === editingId ? { ...p, ...formData } : p
      ))
      setEditingId(null)
      setFormData({ title: '', slug: '', content: '', published: false })
    }
  }

  const handleDelete = (id: number) => {
    updatePages(pages.filter(p => p.id !== id))
  }

  const togglePublished = (id: number) => {
    updatePages(pages.map(p =>
      p.id === id ? { ...p, published: !p.published } : p
    ))
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold mb-1">Custom Pages</h1>
          <p className="text-xs text-slate-400">
            Create and manage custom pages for your mini app.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-xs font-medium rounded-lg"
        >
          + Create Page
        </button>
      </header>

      {(showCreateForm || editingId !== null) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Page' : 'Create New Page'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Page Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="URL Slug (e.g., about-us)"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
                />
              </div>
              <textarea
                placeholder="Page Content (supports basic HTML)"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="rounded border-slate-600 bg-slate-800"
                />
                <span className="text-sm">Published</span>
              </label>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={editingId ? handleUpdate : handleCreate}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded"
              >
                {editingId ? 'Update Page' : 'Create Page'}
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false)
                  setEditingId(null)
                  setFormData({ title: '', slug: '', content: '', published: false })
                }}
                className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-800 text-sm font-medium rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-4">📄 Your Pages ({pages.length})</h2>
        <div className="space-y-3">
          {pages.map((page) => (
            <div key={page.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex-1">
                <div className="font-medium text-sm">{page.title}</div>
                <div className="text-xs text-slate-400">/{page.slug} • {page.published ? 'Published' : 'Draft'}</div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-2">{page.content.substring(0, 100)}...</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePublished(page.id)}
                  className={`px-2 py-1 text-xs rounded ${
                    page.published
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  {page.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => handleEdit(page)}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-xs rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(page.id)}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-xs rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">ℹ️ How to Use Custom Pages</h2>
        <div className="text-xs text-slate-400 space-y-2">
          <p>• Create pages with custom content and URLs</p>
          <p>• Published pages will be accessible at /{`{slug}`}</p>
          <p>• Use HTML in content for formatting</p>
          <p>• Draft pages are hidden from public view</p>
        </div>
      </section>
    </div>
  )
}