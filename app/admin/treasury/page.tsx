'use client'

import { useState } from 'react'
import { useTreasury } from '@/lib/hooks/useTreasury'
import { useTokenManagement } from '@/lib/hooks/useTokenManagement'
import { useAdminManagement } from '@/lib/hooks/useAdminManagement'

export default function TreasuryPage() {
  const { data, withdrawETH, withdrawJOYB, withdrawToken } = useTreasury()
  const { supportedTokens, addToken, removeToken, creditReward, syncToFarcaster } = useTokenManagement()
  const { users, createUser, updateUser, deleteUser, isAdmin } = useAdminManagement()

  const [ethAmount, setEthAmount] = useState('')
  const [joybAmount, setJoybAmount] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')
  const [newTokenAddress, setNewTokenAddress] = useState('')
  const [newTokenSymbol, setNewTokenSymbol] = useState('')
  const [newTokenImage, setNewTokenImage] = useState('')
  const [playerAddress, setPlayerAddress] = useState('')
  const [rewardTokenAddress, setRewardTokenAddress] = useState('')
  const [rewardAmount, setRewardAmount] = useState('')

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-semibold mb-1">Treasury</h1>
        <p className="text-xs text-slate-400">
          Manage treasury balances, token withdrawals, and admin controls.
        </p>
      </header>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">💰 Treasury Balances</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>ETH Balance:</span>
            <span>{data.ethBalance} ETH</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>TOKEN Balance:</span>
            <span>{data.joybBalance} TOKEN</span>
          </div>
          {Object.entries(data.multiTokenBalances).map(([symbol, balance]) => (
            <div key={symbol} className="flex justify-between text-sm">
              <span>{symbol} Balance:</span>
              <span>{balance} {symbol}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">Withdraw Funds</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs mb-1">Withdraw ETH</label>
            <input
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs"
              placeholder="Amount"
            />
            <button
              onClick={() => { withdrawETH(ethAmount); setEthAmount('') }}
              className="mt-2 w-full px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
            >
              Send
            </button>
          </div>
          <div>
            <label className="block text-xs mb-1">Withdraw TOKEN</label>
            <input
              value={joybAmount}
              onChange={(e) => setJoybAmount(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs"
              placeholder="Amount"
            />
            <button
              onClick={() => { withdrawJOYB(joybAmount); setJoybAmount('') }}
              className="mt-2 w-full px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
            >
              Send
            </button>
          </div>
          <div>
            <label className="block text-xs mb-1">Withdraw Any Token</label>
            <input
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs mb-2"
              placeholder="Token address (0x...)"
            />
            <input
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs mb-2"
              placeholder="Amount"
            />
            <button
              onClick={() => { withdrawToken(tokenAddress, tokenAmount); setTokenAddress(''); setTokenAmount('') }}
              className="w-full px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
            >
              Send
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2">💡 Withdraw any ERC20 token by entering its contract address</p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">Admin Overview</h2>
        <div className="space-y-3">
          <p className="text-xs text-slate-500">💡 Admins can call creditReward() for any supported token</p>
          <div>
            <h3 className="text-xs font-semibold mb-1">Current Admins:</h3>
            <ul className="text-xs text-slate-300">
              {users.filter(user => isAdmin(user)).map((admin) => (
                <li key={admin.id}>{admin.username} ({admin.email}) - {admin.role}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">🪙 Multi-Token Rewards</h2>
        <div className="space-y-3">
          <div>
            <h3 className="text-xs font-semibold mb-2">Supported Tokens</h3>
            <ul className="text-xs text-slate-300 space-y-1">
              {supportedTokens.map((token, i) => (
                <li key={i} className="flex justify-between">
                  <span>{token.symbol}: {token.address}</span>
                  <button
                    onClick={() => removeToken(token.address)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold mb-2">Add New Reward Token</h3>
            <input
              value={newTokenAddress}
              onChange={(e) => setNewTokenAddress(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs mb-2"
              placeholder="Token address (0x...)"
            />
            <input
              value={newTokenSymbol}
              onChange={(e) => setNewTokenSymbol(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs mb-2"
              placeholder="Symbol (e.g., USDC)"
            />
            <input
              value={newTokenImage}
              onChange={(e) => setNewTokenImage(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs mb-2"
              placeholder="Image URL (https://...)"
            />
            <button
              onClick={() => { addToken(newTokenAddress, newTokenSymbol, newTokenImage); setNewTokenAddress(''); setNewTokenSymbol(''); setNewTokenImage('') }}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
            >
              Add Token
            </button>
          </div>
          <p className="text-xs text-slate-500">💡 Add any ERC20 token for multi-currency rewards. Image and symbol are optional but recommended.</p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">Credit Reward to Player</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={playerAddress}
            onChange={(e) => setPlayerAddress(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs"
            placeholder="Player address"
          />
          <input
            value={rewardTokenAddress}
            onChange={(e) => setRewardTokenAddress(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs"
            placeholder="Token address"
          />
          <input
            value={rewardAmount}
            onChange={(e) => setRewardAmount(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs"
            placeholder="Amount"
          />
        </div>
        <button
          onClick={() => { creditReward(playerAddress, rewardTokenAddress, rewardAmount); setPlayerAddress(''); setRewardTokenAddress(''); setRewardAmount('') }}
          className="mt-3 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold"
        >
          Credit
        </button>
        <p className="text-xs text-slate-500 mt-2">💡 Manually credit any token reward to any player. Player can claim later.</p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-sm font-semibold mb-3">📡 Sync to Farcaster (API)</h2>
        <button
          onClick={syncToFarcaster}
          className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-slate-950 text-xs font-semibold"
        >
          🔄 Sync Token Metadata to Farcaster
        </button>
        <p className="text-xs text-slate-500 mt-2">💡 Click this to push all token images and names from your browser to the API so users can see them.</p>
      </section>
    </div>
  )
}