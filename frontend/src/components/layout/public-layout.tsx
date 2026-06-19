'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Truck, Phone, Mail } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const platformLinks = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Integrations', href: '/integrations' },
  { name: 'API', href: '/api' },
  { name: 'Fleet Management', href: '/fleet' },
]

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
  { name: 'Press', href: '/press' },
]

const supportLinks = [
  { name: 'Help Center', href: '/help' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Status', href: '/status' },
  { name: 'Security', href: '/security' },
  { name: 'Privacy', href: '/privacy' },
]

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur border-b border-primary/20">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary font-black text-secondary text-lg tracking-tight transition-transform group-hover:scale-110 group-hover:animate-glow-pulse">
              FF
            </div>
            <span className="text-lg font-bold uppercase tracking-wider text-white">
              FreightFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-all hover:text-white relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-5 md:flex">
            <a
              href="tel:+18005550199"
              className="flex items-center gap-2 text-xs font-medium text-zinc-400 transition-colors hover:text-white group"
            >
              <Phone className="h-3.5 w-3.5 group-hover:animate-signal-flash" />
              <span className="uppercase tracking-wider">Call Us</span>
            </a>
            <Link
              href="/login"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="rounded bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-secondary transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Yellow Accent Line with highway animation */}
        <div className="h-px bg-primary overflow-hidden">
          <div className="highway-lines h-full animate-highway-lines" />
        </div>

        {/* Mobile Menu Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-secondary/98 backdrop-blur md:hidden">
            <div className="flex flex-col items-center justify-start gap-1 px-6 pt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="w-full py-3 text-center text-sm font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="my-6 h-px w-full bg-white/10" />

              <a
                href="tel:+18005550199"
                className="flex items-center gap-2 py-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                <span className="uppercase tracking-wider">Call Us</span>
              </a>

              <div className="mt-4 flex w-full flex-col gap-3">
                <Link
                  href="/login"
                  className="rounded border border-white/20 px-4 py-2.5 text-center text-sm font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="rounded bg-primary px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-primary/90"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-secondary relative">
        {/* Yellow Accent Line */}
        <div className="h-px bg-primary overflow-hidden">
          <div className="highway-lines h-full animate-highway-lines" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 - Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded bg-primary font-black text-secondary text-lg tracking-tight">
                  FF
                </div>
                <span className="text-lg font-bold uppercase tracking-wider text-white">
                  FreightFlow
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                The complete freight and logistics operating system for American trucking companies.
              </p>

              {/* Social Icons Placeholder */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded bg-white/5 text-zinc-500 transition-all hover:bg-primary/20 hover:text-primary hover:scale-110">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded bg-white/5 text-zinc-500 transition-all hover:bg-primary/20 hover:text-primary hover:scale-110">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded bg-white/5 text-zinc-500 transition-all hover:bg-primary/20 hover:text-primary hover:scale-110">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Column 2 - Platform */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Platform</h3>
              <ul className="mt-4 space-y-3">
                {platformLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-zinc-500 transition-all hover:text-white hover:translate-x-1 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Company</h3>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-zinc-500 transition-all hover:text-white hover:translate-x-1 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Support */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Support</h3>
              <ul className="mt-4 space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-zinc-500 transition-all hover:text-white hover:translate-x-1 inline-block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-zinc-600">
            &copy; 2026 FreightFlow USA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
