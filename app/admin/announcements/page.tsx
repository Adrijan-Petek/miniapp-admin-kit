'use client'

import { useState } from 'react'

interface Announcement {
  id: number
  message: string
  active: boolean
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, message: '📢 Don’t forget your free daily claim!', active: true },
    { id: 2, message: '🎮 1 free Match-3 & Card Game play every day.', active: true },
  ])
  const [draft, setDraft] = useState('')

  const addAnnouncement = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    setAnnouncements((prev) => [...prev, { id: Date.now(), message: trimmed, active: true }])
    setDraft('')
  }

  const toggleActive = (id: number) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)))
  }

  const remove = (id: number) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold mb-1">Announcements</h1>
        <p className="text-xs text-slate-400">
          Manage messages that appear in your mini app home screens (e.g. Joybit frames, daily claim prompts).
          This demo stores data in local state – wire it to your backend / Upstash in production.
        </p>
      </header>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
        <div>
          <label className="block text-xs mb-1 text-slate-300">New announcement</label>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="📢 Your next announcement..."
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={addAnnouncement}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
            >
              Add
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-3 space-y-2">
          {announcements.length === 0 && <p className="text-xs text-slate-500">No announcements yet.</p>}
          {announcements.map((a) => (
            <div
              key={a.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2"
            >
              <div>
                <p className="text-xs text-slate-100 whitespace-pre-line">{a.message}</p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Status:{' '}
                  <span className={a.active ? 'text-emerald-400' : 'text-slate-500'}>
                    {a.active ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={() => toggleActive(a.id)}
                  className="text-[10px] px-2 py-0.5 rounded border border-slate-700 hover:bg-slate-800"
                >
                  {a.active ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => remove(a.id)}
                  className="text-[10px] px-2 py-0.5 rounded border border-red-500 text-red-400 hover:bg-red-950"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
