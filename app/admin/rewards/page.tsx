'use client'

import { useState } from 'react'

interface RewardRow {
  id: number
  address: string
  token: string
  amount: string
}

export default function RewardsPage() {
  const [rows, setRows] = useState<RewardRow[]>([
    { id: 1, address: '0x1234...abcd', token: 'JOYB', amount: '10000' },
  ])

  const addRow = () => {
    setRows((prev) => [...prev, { id: Date.now(), address: '', token: 'JOYB', amount: '' }])
  }

  const updateRow = (id: number, field: keyof RewardRow, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  const simulateSubmit = () => {
    // In production, send rows to your backend which calls Treasury / on-chain
    console.log('Submitting reward batch:', rows)
    alert('This would submit a reward batch to your backend.
Check console for payload.')
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold mb-1">Rewards</h1>
        <p className="text-xs text-slate-400">
          Prepare batch rewards for your Treasury or Joybit-style game contracts. This panel is a UI scaffold –
          hook it into your actual API that calls smart contracts.
        </p>
      </header>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold">Batch reward editor</h2>
            <p className="text-[11px] text-slate-500">Add player addresses, token symbols, and amounts to send.</p>
          </div>
          <button
            onClick={addRow}
            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-900 text-xs font-semibold hover:bg-white"
          >
            + Add row
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] text-slate-400">
                <th className="text-left py-1.5 pr-2">Player address</th>
                <th className="text-left py-1.5 pr-2">Token</th>
                <th className="text-left py-1.5 pr-2">Amount</th>
                <th className="text-right py-1.5 pl-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-900 last:border-none">
                  <td className="py-1.5 pr-2">
                    <input
                      value={r.address}
                      onChange={(e) => updateRow(r.id, 'address', e.target.value)}
                      placeholder="0x..."
                      className="w-full rounded border border-slate-700 bg-slate-950/70 px-2 py-1 font-mono text-[11px]"
                    />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input
                      value={r.token}
                      onChange={(e) => updateRow(r.id, 'token', e.target.value)}
                      placeholder="JOYB"
                      className="w-full rounded border border-slate-700 bg-slate-950/70 px-2 py-1 text-[11px]"
                    />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input
                      value={r.amount}
                      onChange={(e) => updateRow(r.id, 'amount', e.target.value)}
                      placeholder="1000"
                      className="w-full rounded border border-slate-700 bg-slate-950/70 px-2 py-1 text-[11px]"
                    />
                  </td>
                  <td className="py-1.5 pl-2 text-right">
                    <button
                      onClick={() => removeRow(r.id)}
                      className="text-[11px] px-2 py-0.5 rounded border border-red-500 text-red-400 hover:bg-red-950"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            onClick={simulateSubmit}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
          >
            Simulate submit
          </button>
        </div>
      </section>
    </div>
  )
}
