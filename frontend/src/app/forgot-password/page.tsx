'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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
              <h1 className="text-2xl font-bold text-neutral-100">Reset Password</h1>
              <p className="mt-1 text-sm text-neutral-500">
                Enter your email and we&apos;ll send you a reset link
              </p>
            </div>

            {submitted ? (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm text-neutral-300">
                    If an account exists with that email, you&apos;ll receive a reset link shortly.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-yellow-400"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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

                <button
                  type="submit"
                  className="flex h-11 w-full items-center justify-center rounded-lg bg-primary font-semibold text-secondary text-sm tracking-wide transition-all hover:bg-yellow-400"
                >
                  Send Reset Link
                </button>

                <p className="text-center text-sm text-neutral-500">
                  Remember your password?{' '}
                  <Link
                    href="/login"
                    className="font-semibold text-primary transition-colors hover:text-yellow-400"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
