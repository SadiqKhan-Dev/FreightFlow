'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Settings,
  Filter,
  Check,
  Trash2,
  Mail,
  MailOpen,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Notification {
  id: string
  type: 'shipment' | 'delivery' | 'alert' | 'system'
  icon: any
  title: string
  description: string
  timestamp: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'shipment',
    icon: Package,
    title: 'Shipment FF-2847 Picked Up',
    description: 'Electronics load picked up from Dallas, TX warehouse. En route to Miami, FL distribution center.',
    timestamp: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'delivery',
    icon: CheckCircle2,
    title: 'Delivery Completed - FF-2831',
    description: 'Driver Marcus Johnson successfully delivered auto parts to Atlanta, GA. POD signed by J. Smith.',
    timestamp: '8 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'alert',
    icon: AlertTriangle,
    title: 'Weather Delay - I-40 Corridor',
    description: 'Severe weather conditions reported on I-40 between Amarillo and Albuquerque. 3 shipments may be affected.',
    timestamp: '14 min ago',
    read: false,
  },
  {
    id: '4',
    type: 'system',
    icon: Settings,
    title: 'Fleet Maintenance Scheduled',
    description: 'Unit FF-178 scheduled for routine maintenance. Oil change and brake inspection due at 50,000 miles.',
    timestamp: '22 min ago',
    read: true,
  },
  {
    id: '5',
    type: 'shipment',
    icon: Package,
    title: 'New Shipment Assigned',
    description: 'Priority pharmaceutical shipment assigned to Route I-65 South corridor. Driver Angela Martinez dispatched.',
    timestamp: '35 min ago',
    read: true,
  },
  {
    id: '6',
    type: 'delivery',
    icon: CheckCircle2,
    title: 'Delivery Completed - FF-2850',
    description: 'Perishable goods delivered to Nashville, TN cold storage facility. Temperature log verified.',
    timestamp: '41 min ago',
    read: true,
  },
  {
    id: '7',
    type: 'alert',
    icon: DollarSign,
    title: 'Invoice Overdue - #INV-2847',
    description: 'Invoice INV-2847 for Acme Corp is 15 days past due. Amount: $12,450.00. Payment reminder sent.',
    timestamp: '1 hr ago',
    read: true,
  },
  {
    id: '8',
    type: 'system',
    icon: Bell,
    title: 'Monthly Report Ready',
    description: 'June 2026 operational performance report has been generated and is ready for review.',
    timestamp: '2 hr ago',
    read: true,
  },
  {
    id: '9',
    type: 'shipment',
    icon: Truck,
    title: 'Fleet Unit FF-205 Low Fuel',
    description: 'Vehicle FF-205 fuel level at 34%. Nearest fuel stop: El Paso, TX - I-10 Exit 3.',
    timestamp: '2 hr ago',
    read: true,
  },
  {
    id: '10',
    type: 'delivery',
    icon: CheckCircle2,
    title: 'Delivery Completed - FF-2819',
    description: 'Steel coils delivered to Detroit, MI manufacturing plant. Received by plant manager.',
    timestamp: '3 hr ago',
    read: true,
  },
]

const filterTabs = [
  { id: 'all', label: 'All', count: mockNotifications.length },
  { id: 'shipment', label: 'Shipments', count: mockNotifications.filter((n) => n.type === 'shipment').length },
  { id: 'delivery', label: 'Deliveries', count: mockNotifications.filter((n) => n.type === 'delivery').length },
  { id: 'alert', label: 'Alerts', count: mockNotifications.filter((n) => n.type === 'alert').length },
  { id: 'system', label: 'System', count: mockNotifications.filter((n) => n.type === 'system').length },
]

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [notifications, setNotifications] = useState(mockNotifications)

  const filteredNotifications =
    activeFilter === 'all'
      ? notifications
      : notifications.filter((n) => n.type === activeFilter)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'shipment':
        return 'border-l-primary'
      case 'delivery':
        return 'border-l-fleet-green'
      case 'alert':
        return 'border-l-alert-red'
      case 'system':
        return 'border-l-highway-silver'
      default:
        return 'border-l-muted'
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'shipment':
        return 'text-primary'
      case 'delivery':
        return 'text-fleet-green'
      case 'alert':
        return 'text-alert-red'
      case 'system':
        return 'text-highway-silver'
      default:
        return 'text-muted-foreground'
    }
  }

  const getIconBg = (type: string) => {
    switch (type) {
      case 'shipment':
        return 'bg-primary/10'
      case 'delivery':
        return 'bg-fleet-green/10'
      case 'alert':
        return 'bg-alert-red/10'
      case 'system':
        return 'bg-highway-silver/10'
      default:
        return 'bg-muted/50'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="min-h-screen bg-background space-y-0">
      {/* STATUS STRIP */}
      <div className="w-full bg-secondary border-b border-border">
        <div className="flex items-center gap-4 px-6 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Notification Center
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Unread: <span className="text-primary">{unreadCount}</span>
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
            Total: <span className="text-foreground">{notifications.length}</span>
          </span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Notification Center
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
              Operational alerts, shipment updates, and system messages
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground uppercase tracking-wider transition-all hover:border-primary/50 hover:bg-card/80 active:scale-[0.98]"
            >
              <Check className="h-4 w-4" />
              Mark All Read
            </button>
          </div>
        </div>

        {/* FILTER TABS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary p-1 w-fit">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === tab.id
                    ? 'bg-primary text-industrial-black shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    activeFilter === tab.id
                      ? 'bg-industrial-black/20 text-industrial-black'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* NOTIFICATION LIST */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center py-16">
                  <Bell className="h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-3 text-sm font-medium text-muted-foreground">
                    No notifications in this category
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Check back later for updates
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {filteredNotifications.map((notif, i) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.03 }}
                      className={`flex items-start gap-4 px-5 py-4 border-l-4 ${getBorderColor(
                        notif.type
                      )} transition-colors hover:bg-muted/30 ${
                        !notif.read ? 'bg-muted/10' : ''
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${getIconBg(
                          notif.type
                        )}`}
                      >
                        <notif.icon className={`h-5 w-5 ${getIconColor(notif.type)}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4
                                className={`text-sm font-bold text-foreground ${
                                  !notif.read ? 'text-foreground' : 'text-foreground/80'
                                }`}
                              >
                                {notif.title}
                              </h4>
                              {!notif.read && (
                                <span className="relative flex h-2 w-2">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                              {notif.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge
                              variant={
                                notif.type === 'shipment'
                                  ? 'warning'
                                  : notif.type === 'delivery'
                                  ? 'success'
                                  : notif.type === 'alert'
                                  ? 'destructive'
                                  : 'info'
                              }
                              className="text-[8px] px-1.5 py-0.5"
                            >
                              {notif.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-[10px] font-medium text-muted-foreground">
                              {notif.timestamp}
                            </span>
                          </div>
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider hover:text-primary/80 transition-colors"
                            >
                              <MailOpen className="h-3 w-3" />
                              Mark Read
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
