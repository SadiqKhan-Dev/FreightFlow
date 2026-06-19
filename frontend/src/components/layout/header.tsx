'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/ui-store'
import { useAuthStore } from '@/store/auth-store'
import { useThemeStore } from '@/store/theme-store'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bell, LogOut, Search, Sun, Moon } from 'lucide-react'

const routeTitles: Record<string, string> = {
  '/dashboard': 'Operations Dashboard',
  '/dashboard/shipments': 'Shipment Management',
  '/dashboard/fleet': 'Fleet Overview',
  '/dashboard/drivers': 'Driver Management',
  '/dashboard/dispatch': 'Dispatch Control',
  '/dashboard/tracking': 'Live Tracking',
  '/dashboard/invoices': 'Invoice Center',
  '/dashboard/routes': 'Route Planning',
  '/dashboard/warehouses': 'Warehouse Operations',
  '/dashboard/reports': 'Reports & Analytics',
  '/dashboard/settings': 'System Settings',
  '/dashboard/customers': 'Customer Directory',
  '/dashboard/notifications': 'Notifications',
  '/dashboard/company': 'Company Profile',
}

export function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()

  const pageTitle = routeTitles[pathname] || 'FreightFlow'

  const userInitials = user
    ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'FF'
    : 'FF'

  const userName = user ? `${user.first_name} ${user.last_name}` : 'Operator'

  return (
    <header className="sticky top-0 z-30 flex items-center h-16 px-6 border-b border-white/10 bg-card/80 backdrop-blur-md">
      {/* Left: Page Title */}
      <div className="flex items-center gap-4 flex-1">
        <div>
          <h1 className="text-lg font-bold text-white font-['Exo_2'] tracking-wide">
            {pageTitle}
          </h1>
          <p className="text-xs text-white/40">
            FreightFlow USA Command Center
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          title="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {/* Yellow dot indicator */}
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10" />

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-primary/30">
              <AvatarFallback className="bg-white/10 text-primary text-xs font-semibold font-['Exo_2']">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">
                {userName}
              </p>
              <p className="text-xs text-white/40">
                {user.role || 'Operator'}
              </p>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
