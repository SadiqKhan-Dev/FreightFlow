'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/ui-store'
import { useAuthStore } from '@/store/auth-store'
import { useThemeStore } from '@/store/theme-store'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  ClipboardList,
  MapPin,
  FileText,
  Route,
  Warehouse,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Shipments', icon: Package, href: '/dashboard/shipments' },
  { label: 'Fleet', icon: Truck, href: '/dashboard/fleet' },
  { label: 'Drivers', icon: Users, href: '/dashboard/drivers' },
  { label: 'Dispatch', icon: ClipboardList, href: '/dashboard/dispatch' },
  { label: 'Tracking', icon: MapPin, href: '/dashboard/tracking' },
  { label: 'Invoices', icon: FileText, href: '/dashboard/invoices' },
  { label: 'Routes', icon: Route, href: '/dashboard/routes' },
  { label: 'Warehouses', icon: Warehouse, href: '/dashboard/warehouses' },
  { label: 'Reports', icon: BarChart3, href: '/dashboard/reports' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { user, logout } = useAuthStore()

  const userInitials = user
    ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'FF'
    : 'FF'

  const userName = user ? `${user.first_name} ${user.last_name}` : 'Operator'

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen bg-secondary transition-all duration-300 ease-in-out overflow-hidden',
        sidebarCollapsed ? 'w-16' : 'w-[260px]'
      )}
    >
      {/* Yellow accent line on left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary" />

      {/* Logo Section */}
      <div className="flex items-center h-16 px-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary shrink-0">
            <span className="text-sm font-extrabold text-secondary tracking-tight font-['Exo_2']">
              FF
            </span>
          </div>
          {!sidebarCollapsed && (
            <span className="text-base font-bold uppercase tracking-widest text-primary font-['Exo_2'] whitespace-nowrap">
              FreightFlow
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-primary text-secondary'
                      : 'text-white/50 hover:bg-white/5 hover:text-white/80',
                    sidebarCollapsed && 'justify-center px-0'
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-secondary' : '')} />
                  {!sidebarCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-white/10 p-3">
        {/* User Info */}
        {!sidebarCollapsed && user && (
          <div className="flex items-center gap-3 px-2 mb-3">
            <Avatar className="h-9 w-9 shrink-0 border-2 border-primary/30">
              <AvatarFallback className="bg-white/10 text-primary text-xs font-semibold font-['Exo_2']">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">
                {userName}
              </p>
              <p className="text-xs text-white/40 truncate">
                {user.role || 'Operator'}
              </p>
            </div>
          </div>
        )}

        {/* Collapsed Avatar */}
        {sidebarCollapsed && user && (
          <div className="flex justify-center mb-3">
            <Avatar className="h-9 w-9 border-2 border-primary/30">
              <AvatarFallback className="bg-white/10 text-primary text-xs font-semibold font-['Exo_2']">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Action Buttons */}
        <div className={cn('flex gap-2', sidebarCollapsed ? 'flex-col' : 'flex-row')}>
          <button
            onClick={toggleSidebar}
            className={cn(
              'flex items-center justify-center h-9 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors',
              sidebarCollapsed ? 'w-full' : 'flex-1'
            )}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
          {!sidebarCollapsed && (
            <button
              onClick={logout}
              className="flex items-center justify-center flex-1 h-9 rounded-lg bg-white/5 text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">Logout</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
