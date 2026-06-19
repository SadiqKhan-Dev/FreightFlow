'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, AuthResponse } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await api.post<AuthResponse>('/api/v1/auth/login', { email, password })
      login(data)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
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
              <h1 className="text-2xl font-bold text-neutral-100">Welcome Back</h1>
              <p className="mt-1 text-sm text-neutral-500">Sign in to your operations center</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm font-medium text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-11 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-400">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-600 bg-neutral-800 text-primary accent-primary"
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary transition-colors hover:text-yellow-400"
                >
                  Forgot password?
                </Link>
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
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

              <p className="text-center text-sm text-neutral-500">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="font-semibold text-primary transition-colors hover:text-yellow-400"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
