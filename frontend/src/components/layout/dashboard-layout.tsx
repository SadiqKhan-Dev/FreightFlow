'use client'

import { Sidebar } from './sidebar'
import { Header } from './header'
import { useUIStore } from '@/store/ui-store'
import { cn } from '@/lib/utils'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useUIStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn('transition-all duration-300', sidebarCollapsed ? 'ml-16' : 'ml-64')}>
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
