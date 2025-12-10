'use client'

import { useState } from 'react'
import { useAnnouncements } from '@/lib/hooks/useAnnouncements'

export default function AnnouncementsPage() {
  const { announcements, updateAnnouncement, clearAll, saveAndPublish } = useAnnouncements()
  const [editId, setEditId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const startEdit = (id: number, text: string) => {
    setEditId(id)
    setEditText(text)
  }

  const saveEdit = () => {
    if (editId !== null) {
      updateAnnouncement(editId, editText)
      setEditId(null)
      setEditText('')
    }
  }

  const preview = announcements.map(a => `📢 ${a.text}`).join(' • ')

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold mb-1">Announcement Manager</h1>
        <p className="text-xs text-slate-400">
          Manage scrolling announcements for your mini app.
        </p>
      </header>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">📋 Current Active Messages</h2>
        <div className="space-y-2">
          {announcements.map((a, i) => (
            <div key={a.id} className="text-xs text-slate-300">
              {i + 1}. {a.text} {a.charCount} chars
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">✨ Live Preview (before saving)</h2>
        <div className="text-xs text-slate-300 bg-slate-950/60 p-2 rounded border">
          {preview}
        </div>
        <p className="text-xs text-slate-500 mt-2">These messages are scrolling on the main page</p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">Edit Announcements</h2>
        <div className="space-y-3">
          {announcements.map((a, i) => (
            <div key={a.id} className="border border-slate-700 rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold">Announcement {i + 1}</span>
                {editId === a.id ? (
                  <button
                    onClick={saveEdit}
                    className="text-xs px-2 py-1 bg-emerald-500 text-slate-950 rounded"
                  >
                    💎 Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(a.id, a.text)}
                    className="text-xs px-2 py-1 bg-blue-500 text-slate-950 rounded"
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>
              {editId === a.id ? (
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={2}
                  className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs"
                  maxLength={150}
                />
              ) : (
                <p className="text-xs text-slate-300">{a.text}</p>
              )}
              <p className="text-xs text-slate-500 mt-1">{a.charCount}/150 characters</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex gap-3">
          <button
            onClick={saveAndPublish}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
          >
            💾 Save & Publish
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-slate-950 text-xs font-semibold"
          >
            🗑️ Clear All
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2">💡 Up to 5 messages scroll continuously in a seamless loop with spacing (•) between them. Leave blank to skip.</p>
      </section>
    </div>
  )
}
