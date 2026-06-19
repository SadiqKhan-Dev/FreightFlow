import type { Metadata } from 'next'
import { Exo } from 'next/font/google'
import './globals.css'

const exo = Exo({
  subsets: ['latin'],
  variable: '--font-exo',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'FreightFlow USA - American Freight & Trucking Operating System',
  description: 'The complete freight, dispatch, fleet, and logistics operating system for American trucking companies, freight brokers, and fleet management teams.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${exo.variable} dark`}>
      <body className={`${exo.className} antialiased`}>{children}</body>
    </html>
  )
}
