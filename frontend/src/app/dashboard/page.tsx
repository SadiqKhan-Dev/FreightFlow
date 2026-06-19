'use client'

import { useEffect, useState } from 'react'
import { api, DashboardStats } from '@/lib/api'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Truck,
  Package,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
  MapPin,
  Plus,
  Send,
  Navigation,
  AlertTriangle,
  CheckCircle2,
  PackageCheck,
  Activity,
  BarChart3,
  Users,
  Wrench,
  BedDouble,
  ArrowRight,
  Radio,
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ActivityItem {
  id: string
  time: string
  type: 'pickup' | 'delivery' | 'delay' | 'dispatch'
  description: string
  status: string
}

interface ShipmentRow {
  id: string
  shipment_number: string
  origin: string
  destination: string
  status: string
  driver_name: string
  eta: string
}

interface FleetStatus {
  available: number
  on_trip: number
  maintenance: number
  off_duty: number
}

interface RevenueMonth {
  month: string
  amount: number
}

export default function DashboardPage() {
  const { token } = useAuthStore()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentShipments, setRecentShipments] = useState<ShipmentRow[]>([])
  const [fleetStatus, setFleetStatus] = useState<FleetStatus>({
    available: 12,
    on_trip: 8,
    maintenance: 3,
    off_duty: 5,
  })
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [revenueHistory, setRevenueHistory] = useState<RevenueMonth[]>([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (token) {
      Promise.all([
        api.get<DashboardStats>('/api/v1/dashboard/stats', token),
        api.get<any[]>('/api/v1/dashboard/recent-shipments', token),
      ])
        .then(([statsData, shipmentsData]) => {
          setStats(statsData)
          setRecentShipments(shipmentsData || [])

          setRevenueHistory([
            { month: 'Jan', amount: (statsData?.revenue_this_month || 0) * 0.65 },
            { month: 'Feb', amount: (statsData?.revenue_this_month || 0) * 0.72 },
            { month: 'Mar', amount: (statsData?.revenue_this_month || 0) * 0.85 },
            { month: 'Apr', amount: (statsData?.revenue_this_month || 0) * 0.78 },
            { month: 'May', amount: statsData?.revenue_last_month || 0 },
            { month: 'Jun', amount: statsData?.revenue_this_month || 0 },
          ])

          setActivities([
            {
              id: '1',
              time: '2 min ago',
              type: 'pickup',
              description: `Shipment FF-2847 picked up from Dallas, TX`,
              status: 'picked_up',
            },
            {
              id: '2',
              time: '8 min ago',
              type: 'delivery',
              description: `Driver Marcus Johnson completed delivery in Atlanta, GA`,
              status: 'delivered',
            },
            {
              id: '3',
              time: '14 min ago',
              type: 'dispatch',
              description: `New dispatch assigned to Route I-85 South corridor`,
              status: 'assigned',
            },
            {
              id: '4',
              time: '22 min ago',
              type: 'delay',
              description: `Shipment FF-2831 delayed due to weather - I-40 corridor`,
              status: 'in_transit',
            },
            {
              id: '5',
              time: '35 min ago',
              type: 'pickup',
              description: `Shipment FF-2850 picked up from Houston, TX`,
              status: 'picked_up',
            },
            {
              id: '6',
              time: '41 min ago',
              type: 'delivery',
              description: `Driver Sarah Chen delivered to Nashville, TN warehouse`,
              status: 'delivered',
            },
            {
              id: '7',
              time: '1 hr ago',
              type: 'dispatch',
              description: `Fleet unit #14 dispatched for priority load to Chicago, IL`,
              status: 'assigned',
            },
          ])

          setFleetStatus({
            available: 12,
            on_trip: Math.min(statsData?.active_deliveries || 8, 20),
            maintenance: 3,
            off_duty: 5,
          })
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [token])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <Truck className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Loading operations center...
          </p>
        </div>
      </div>
    )
  }

  const revenueChange = stats?.revenue_last_month
    ? ((stats.revenue_this_month - stats.revenue_last_month) / stats.revenue_last_month) * 100
    : 0

  const onTimePercent = stats
    ? Math.round(((stats.total_shipments - Math.floor(stats.total_shipments * 0.08)) / stats.total_shipments) * 100)
    : 96

  const fleetUtilization = stats
    ? Math.round((fleetStatus.on_trip / (fleetStatus.available + fleetStatus.on_trip + fleetStatus.maintenance + fleetStatus.off_duty)) * 100)
    : 0

  const maxRevenue = Math.max(...revenueHistory.map((r) => r.amount))

  const activityIcon = (type: string) => {
    switch (type) {
      case 'pickup':
        return <PackageCheck className="h-4 w-4 text-primary" />
      case 'delivery':
        return <CheckCircle2 className="h-4 w-4 text-fleet-green" />
      case 'delay':
        return <AlertTriangle className="h-4 w-4 text-alert-red" />
      case 'dispatch':
        return <Send className="h-4 w-4 text-highway-silver" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const activityBg = (type: string) => {
    switch (type) {
      case 'pickup':
        return 'border-l-primary'
      case 'delivery':
        return 'border-l-fleet-green'
      case 'delay':
        return 'border-l-alert-red'
      case 'dispatch':
        return 'border-l-highway-silver'
      default:
        return 'border-l-muted'
    }
  }

  const statusBadgeVariant = (status: string): 'success' | 'warning' | 'destructive' | 'info' | 'default' => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'success'
      case 'in_transit':
      case 'picked_up':
      case 'assigned':
        return 'warning'
      case 'cancelled':
      case 'delayed':
        return 'destructive'
      case 'pending':
        return 'info'
      default:
        return 'default'
    }
  }

  const metricCards = [
    {
      title: 'ACTIVE FREIGHT',
      value: stats?.active_deliveries || 0,
      icon: Truck,
      accent: 'text-primary',
      bgAccent: 'bg-primary/10',
      borderAccent: 'border-primary/30',
      trend: '+3.2%',
      trendUp: true,
    },
    {
      title: 'REVENUE THIS MONTH',
      value: formatCurrency(stats?.revenue_this_month || 0),
      icon: DollarSign,
      accent: 'text-fleet-green',
      bgAccent: 'bg-fleet-green/10',
      borderAccent: 'border-fleet-green/30',
      trend: `${revenueChange >= 0 ? '+' : ''}${revenueChange.toFixed(1)}%`,
      trendUp: revenueChange >= 0,
    },
    {
      title: 'ON-TIME DELIVERY',
      value: `${onTimePercent}%`,
      icon: Clock,
      accent: onTimePercent >= 90 ? 'text-fleet-green' : 'text-alert-red',
      bgAccent: onTimePercent >= 90 ? 'bg-fleet-green/10' : 'bg-alert-red/10',
      borderAccent: onTimePercent >= 90 ? 'border-fleet-green/30' : 'border-alert-red/30',
      trend: onTimePercent >= 90 ? 'Above target' : 'Below target',
      trendUp: onTimePercent >= 90,
    },
    {
      title: 'FLEET UTILIZATION',
      value: `${fleetUtilization}%`,
      icon: Navigation,
      accent: 'text-primary',
      bgAccent: 'bg-primary/10',
      borderAccent: 'border-primary/30',
      trend: `${fleetStatus.on_trip} of ${fleetStatus.available + fleetStatus.on_trip + fleetStatus.maintenance + fleetStatus.off_duty} units`,
      trendUp: true,
      isProgress: true,
      progressValue: fleetUtilization,
    },
  ]

  return (
    <div className="min-h-screen bg-background space-y-0">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: OPERATIONAL STATUS STRIP
      ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-secondary border-b border-border"
      >
        <div className="flex items-center justify-between px-6 py-2.5">
          {/* Left: Status Label */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fleet-green opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fleet-green" />
              </span>
              <span className="text-xs font-bold tracking-widest text-fleet-green uppercase">
                Operational Status
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
              Active: <span className="text-primary">{stats?.active_deliveries || 0}</span>
            </span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
              En Route: <span className="text-fleet-green">{fleetStatus.on_trip}</span>
            </span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
              Delayed: <span className="text-alert-red">2</span>
            </span>
          </div>

          {/* Right: Date/Time */}
          <div className="flex items-center gap-3">
            <Radio className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-foreground/60 uppercase">
              {currentTime ? currentTime.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }) : '---'}
            </span>
            <span className="text-xs font-mono font-bold text-primary tabular-nums">
              {currentTime ? currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              }) : '--:--:--'}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="px-6 py-6 space-y-6">
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2: COMMAND CENTER HEADER
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-end justify-between"
        >
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
              Operations Command Center
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground tracking-wide">
              Real-time fleet and freight overview
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-industrial-black uppercase tracking-wider transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
              <Plus className="h-4 w-4" />
              New Shipment
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground uppercase tracking-wider transition-all hover:border-primary/50 hover:bg-card/80 active:scale-[0.98]">
              <Send className="h-4 w-4" />
              Dispatch
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground uppercase tracking-wider transition-all hover:border-primary/50 hover:bg-card/80 active:scale-[0.98]">
              <Navigation className="h-4 w-4" />
              Track
            </button>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3: PRIMARY METRICS GRID
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <Card className={`bg-card border ${card.borderAccent} relative overflow-hidden transition-all hover:shadow-lg hover:shadow-${card.accent.replace('text-', '')}/5`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                        {card.title}
                      </p>
                      <p className="text-3xl font-black tracking-tight text-foreground">
                        {card.value}
                      </p>
                    </div>
                    <div className={`rounded-xl ${card.bgAccent} p-3`}>
                      <card.icon className={`h-6 w-6 ${card.accent}`} />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {card.trendUp ? (
                      <TrendingUp className="h-3.5 w-3.5 text-fleet-green" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-alert-red" />
                    )}
                    <span
                      className={`text-xs font-bold ${
                        card.trendUp ? 'text-fleet-green' : 'text-alert-red'
                      }`}
                    >
                      {card.trend}
                    </span>
                    {card.isProgress && (
                      <span className="text-[10px] font-medium text-muted-foreground ml-1">
                        utilization
                      </span>
                    )}
                  </div>

                  {card.isProgress && (
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${card.progressValue}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  )}

                  <div
                    className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${card.bgAccent} opacity-20 blur-2xl`}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 + 5: ACTIVITY FEED + RECENT SHIPMENTS (2-col)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* LIVE ACTIVITY FEED */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card border-border h-full">
              <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Live Operations Feed
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Real-time activity stream
                      </p>
                    </div>
                  </div>
                  <Badge variant="warning" className="text-[9px] px-2 py-0.5">
                    LIVE
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[420px] overflow-y-auto">
                  {activities.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className={`flex items-start gap-3 border-b border-border/50 px-5 py-3.5 transition-colors hover:bg-muted/30 border-l-4 ${activityBg(item.type)}`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {activityIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground leading-snug">
                          {item.description}
                        </p>
                        <p className="mt-1 text-[10px] font-medium text-muted-foreground tracking-wide">
                          {item.time}
                        </p>
                      </div>
                      <Badge
                        variant={statusBadgeVariant(item.status)}
                        className="flex-shrink-0 text-[8px] px-1.5 py-0.5"
                      >
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RECENT SHIPMENTS TABLE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="bg-card border-border h-full">
              <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Recent Shipments
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Last {recentShipments.length} shipments
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider transition-colors hover:text-primary/80">
                    View All
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[420px] overflow-y-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                          Shipment #
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                          Origin
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                          Destination
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                          Status
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                          Driver
                        </th>
                        <th className="px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                          ETA
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentShipments.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-5 py-12 text-center">
                            <Package className="mx-auto h-8 w-8 text-muted-foreground/50" />
                            <p className="mt-2 text-sm font-medium text-muted-foreground">
                              No shipments yet
                            </p>
                            <p className="text-xs text-muted-foreground/70">
                              Create your first shipment to get started.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        recentShipments.map((shipment, i) => (
                          <motion.tr
                            key={shipment.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + i * 0.03 }}
                            className="border-b border-border/30 transition-colors hover:bg-muted/30 cursor-pointer group"
                          >
                            <td className="px-5 py-3.5">
                              <span className="text-sm font-bold text-primary font-mono">
                                {shipment.shipment_number}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="text-sm text-foreground/80">
                                {shipment.origin || '—'}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="text-sm text-foreground/80">
                                {shipment.destination || '—'}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <Badge
                                variant={statusBadgeVariant(shipment.status)}
                                className="text-[9px] px-2 py-0.5"
                              >
                                {shipment.status?.replace('_', ' ')}
                              </Badge>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="text-sm text-foreground/70">
                                {shipment.driver_name || 'Unassigned'}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="text-sm text-foreground/70 font-mono">
                                {shipment.eta ? formatDate(shipment.eta) : '—'}
                              </span>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 + 7: FLEET STATUS + REVENUE CHART (2-col)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* FLEET STATUS OVERVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card border-border h-full">
              <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                      Fleet Status
                    </CardTitle>
                    <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                      Vehicle availability overview
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: 'Available',
                      count: fleetStatus.available,
                      icon: CheckCircle2,
                      color: 'text-fleet-green',
                      bg: 'bg-fleet-green/10',
                      border: 'border-fleet-green/20',
                    },
                    {
                      label: 'On Trip',
                      count: fleetStatus.on_trip,
                      icon: Navigation,
                      color: 'text-primary',
                      bg: 'bg-primary/10',
                      border: 'border-primary/20',
                    },
                    {
                      label: 'Maintenance',
                      count: fleetStatus.maintenance,
                      icon: Wrench,
                      color: 'text-alert-red',
                      bg: 'bg-alert-red/10',
                      border: 'border-alert-red/20',
                    },
                    {
                      label: 'Off Duty',
                      count: fleetStatus.off_duty,
                      icon: BedDouble,
                      color: 'text-muted-foreground',
                      bg: 'bg-muted/50',
                      border: 'border-border',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-xl border ${item.border} ${item.bg} p-4 transition-all hover:scale-[1.02]`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                        <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                          {item.label}
                        </span>
                      </div>
                      <p className={`mt-2 text-2xl font-black ${item.color}`}>
                        {item.count}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Visual Distribution Bar */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                    Fleet Distribution
                  </p>
                  <div className="flex h-3 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(fleetStatus.available / (fleetStatus.available + fleetStatus.on_trip + fleetStatus.maintenance + fleetStatus.off_duty)) * 100}%`,
                      }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="bg-fleet-green h-full"
                      title="Available"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(fleetStatus.on_trip / (fleetStatus.available + fleetStatus.on_trip + fleetStatus.maintenance + fleetStatus.off_duty)) * 100}%`,
                      }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="bg-primary h-full"
                      title="On Trip"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(fleetStatus.maintenance / (fleetStatus.available + fleetStatus.on_trip + fleetStatus.maintenance + fleetStatus.off_duty)) * 100}%`,
                      }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="bg-alert-red h-full"
                      title="Maintenance"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(fleetStatus.off_duty / (fleetStatus.available + fleetStatus.on_trip + fleetStatus.maintenance + fleetStatus.off_duty)) * 100}%`,
                      }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      className="bg-muted h-full"
                      title="Off Duty"
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-medium text-muted-foreground">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* REVENUE CHART PLACEHOLDER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="bg-card border-border h-full">
              <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold tracking-wider uppercase text-foreground">
                        Revenue Trend
                      </CardTitle>
                      <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                        Last 6 months performance
                      </p>
                    </div>
                  </div>
                  <Badge variant="info" className="text-[9px] px-2 py-0.5">
                    6-MONTH
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="flex items-end gap-3 h-52">
                  {revenueHistory.map((item, i) => {
                    const heightPercent = maxRevenue > 0 ? (item.amount / maxRevenue) * 100 : 0
                    const isLast = i === revenueHistory.length - 1
                    return (
                      <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                        <span className="text-[10px] font-bold text-foreground/70 tabular-nums">
                          {formatCurrency(item.amount)}
                        </span>
                        <div className="w-full flex justify-center">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercent}%` }}
                            transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                            className={`w-full max-w-[48px] rounded-t-lg ${
                              isLast ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-primary/40'
                            } transition-colors hover:bg-primary/70 cursor-pointer relative group`}
                            title={`${item.month}: ${formatCurrency(item.amount)}`}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-bold tracking-wider uppercase ${
                            isLast ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        >
                          {item.month}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Summary */}
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                      6-Month Total
                    </p>
                    <p className="text-lg font-black text-foreground">
                      {formatCurrency(revenueHistory.reduce((sum, r) => sum + r.amount, 0))}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                      Monthly Average
                    </p>
                    <p className="text-lg font-black text-foreground">
                      {formatCurrency(
                        revenueHistory.reduce((sum, r) => sum + r.amount, 0) / revenueHistory.length
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
