'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, AuthResponse } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'company_owner',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await api.post<AuthResponse>('/api/v1/auth/register', form)
      login(data)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4 py-10">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-card shadow-2xl">
          <div className="h-1 w-full bg-primary" />

          <div className="p-8">
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary font-black text-secondary text-lg tracking-tight">
                FF
              </div>
              <span className="text-xl font-bold tracking-widest text-neutral-100">
                FREIGHT<span className="text-primary">FLOW</span>
              </span>
            </div>

            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-neutral-100">Create Your Account</h1>
              <p className="mt-1 text-sm text-neutral-500">Join the freight operations network</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm font-medium text-red-400">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    First Name
                  </label>
                  <input
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    placeholder="John"
                    required
                    className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    Last Name
                  </label>
                  <input
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    placeholder="Doe"
                    required
                    className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="operator@freightflow.com"
                  required
                  className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="h-11 w-full appearance-none rounded-lg border border-neutral-700 bg-neutral-900 px-4 text-sm text-neutral-100 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                >
                  <option value="company_owner">Company Owner</option>
                  <option value="dispatcher">Dispatcher</option>
                  <option value="driver">Driver</option>
                  <option value="customer">Customer</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-full items-center justify-center rounded-lg bg-primary font-semibold text-secondary text-sm tracking-wide transition-all hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              <p className="text-center text-sm text-neutral-500">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-primary transition-colors hover:text-yellow-400"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
