'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Password salah.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white border rounded-xl p-8 w-full max-w-sm shadow-sm">
        <h1 className="font-bold text-xl text-gray-800 mb-1">Admin Panel</h1>
        <p className="text-sm text-gray-500 mb-6">Berita Meureno CMS</p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-[13px] text-red-700 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="Masukkan password admin..."
              className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-aceh-green text-white font-semibold py-2.5 rounded-md hover:bg-aceh-green-dark transition-colors disabled:opacity-60"
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
